import { Request, Response } from 'express';
import { AdminService } from './../service/admin.service';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { MessagesResponse } from '../../handler/messagesResponse';

export class AdminController { 
  constructor(
    private readonly adminService: AdminService,
    private readonly authenticationService: AuthenticationService
  ) {
    console.log('AdminController constructor - adminService:', this.adminService);
    console.log('AdminController constructor - authenticationService:', this.authenticationService);
  }


  async createAdmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      console.log(req.body)
      const newRequest ={ ...req.body,password:await this.authenticationService.encryptPassword(req.body.password)}

    const verifyEmail=  await this.adminService.findByEmail(req.body.email)
    if(verifyEmail) {
      return errorResponse(res,`Este email:  ${req.body.email}  ja se encontra cadatrado`,400)  
    }
    const verifyPhone=  await this.adminService.findByPhone(req.body.phone)
    if(verifyPhone) {
      return errorResponse(res,`Este contacto : ${req.body.phone} ja se encontra cadatrado`,400)  
    }
    const verifyNif=  await this.adminService.findByNif(req.body.nif)
    console.log(verifyNif)
    if(verifyNif) {
      return errorResponse(res,`Este Nif : ${req.body.nif} ja se encontra cadatrado`,400)  
    }
       const createdAdmin = await this.adminService.create(newRequest);
      return successResponse(res,createdAdmin,'Admin cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async findAlladmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.adminService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async findOneadmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}=req.params
      const admin = await this.adminService.findByid(parseInt(Id))
      console.log(admin)
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      return successResponse(res,admin,'user found !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async sign(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const admin = await this.adminService.findByEmail(req.body.email)
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      if(!admin.isActive){
        return errorResponse(res,MessagesResponse.ACCOUNT_DISABLED,401)  
      }
      const verify = await this.authenticationService.comparePasswords(req.body.password,admin.password)
     if(!verify){
      return errorResponse(res,MessagesResponse.WRONG_PASSWORD,401)  
     }
     const adminWithRole = {
      ...admin,
      role: 'ADMIN'
    };
      const token = await this.authenticationService.generateToken(adminWithRole)
      return successResponse(res,token,'Seu token !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async updateAdmin(req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const admin = await this.adminService.findByEmail(req.body.email)
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const newRequest = {
        ...req.body,
        password: req.body.password != null ? await this.authenticationService.encryptPassword(req.body.password) : admin.password
      };
      const updateAdmin = await this.adminService.update(parseInt(Id, 10),newRequest);
      return successResponse(res,updateAdmin,'Admin Atualizado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async deleteAdmin (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const admin = await this.adminService.findByid(parseInt(Id, 10));
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const deleteAdmin = await this.adminService.update(parseInt(Id, 10),req.body);
      return successResponse(res,deleteAdmin,'Admin deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async deactivateAccount (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const admin = await this.adminService.findByid(parseInt(Id, 10));
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const desative = await this.adminService.deactivateAccount(parseInt(Id, 10));
      return successResponse(res,desative,'Admin desativado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async activateAccount (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const admin = await this.adminService.findByid(parseInt(Id, 10));
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const active = await this.adminService.activateAccount(parseInt(Id, 10));
      return successResponse(res,active,'Activado  com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  
  async createTeam (req: Request, res: Response, ): Promise<unknown> {
    try {
 
      const active = await this.adminService.createTeam(req.body);
      return successResponse(res,active,'O Team Foi criado !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }

  async findAllTeam (req: Request, res: Response, ): Promise<unknown> {
    try {
 
      const team = await this.adminService.findAllTeam();
      return successResponse(res,team,'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async findOneTeam (req: Request, res: Response, ): Promise<unknown> {
    try {
     const {Id}= req.params
      const team = await this.adminService.findOneTeam(parseInt(Id));
      if(!team){
        return errorResponse(res,'Team not found !',401)  
      }
      return successResponse(res,team,'O Team Foi criado !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async deleteTeam (req: Request, res: Response, ): Promise<unknown> {
    try {
     const {Id}= req.params
     const verify = await this.adminService.findOneTeam(parseInt(Id));
     if(!verify){
       return errorResponse(res,MessagesResponse.TEAM_NOT_FOUND,401)  
     }
      const team = await this.adminService.deleteTeam(parseInt(Id));
      return successResponse(res,team,MessagesResponse.TEAM_DELETED,200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async updateTeam (req: Request, res: Response, ): Promise<unknown> {
    try {
 const {Id} = req.params
      const team = await this.adminService.updateTeam(req.body,parseInt(Id));
      return successResponse(res,team,'O Team Foi Editado !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  
}
