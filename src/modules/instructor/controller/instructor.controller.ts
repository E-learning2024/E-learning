import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { InstructorService } from '../service/instructor.service';

export class InstructorController { 
  constructor(
    private readonly instructorService: InstructorService,
    private readonly authenticationService: AuthenticationService
  ) {
    console.log('InstructorController constructor - instructorService:', this.instructorService);
    console.log('InstructorController constructor - authenticationService:', this.authenticationService);
  }


  async create(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const newRequest ={ ...req.body,password:await this.authenticationService.encryptPassword(req.body.password)}
    const verifyEmail=  await this.instructorService.findByEmail(req.body.email)
    if(verifyEmail) {
      return errorResponse(res,`Este email:  ${req.body.email}  ja se encontra cadatrado`,400)  
    }
    const verifyPhone=  await this.instructorService.findByPhone(req.body.phone)
    if(verifyPhone) {
      return errorResponse(res,`Este contacto : ${req.body.phone} ja se encontra cadatrado`,400)  
    }
       const createdAdmin = await this.instructorService.create(newRequest);
      return successResponse(res,createdAdmin,'Instructor cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findAllinstructor(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.instructorService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  // async findOneadmin(req: Request, res: Response, ): Promise<unknown> {
  //   try { 
  //     const {Id}=req.params
  //     const admin = await this.adminService.findByid(parseInt(Id))
  //     console.log(admin)
  //     if(!admin){
  //       return errorResponse(res,'Admin not found !',401)  
  //     }
  //     return successResponse(res,admin,'user found !',200);
  //   } catch (error) {
  //     console.log(error);
  //     return errorResponse(res,'Server Error',500)  
  //   }
  // }
  async sign(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const admin = await this.instructorService.findByEmail(req.body.email)
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const verify = await this.authenticationService.comparePasswords(req.body.password,admin.password)
     if(!verify){
      return errorResponse(res,'Senha Incorrecta !',401)  
     }
      const token = await this.authenticationService.generateToken(admin)
      return successResponse(res,token,'Seu token !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  // async updateAdmin (req: Request, res: Response, ): Promise<unknown> {
  //   try {
  //     const { id } = req.params;
   
  //     const updateAdmin = await this.adminService.update(parseInt(id, 10),req.body);
  //     return successResponse(res,updateAdmin,'Admin Atualizado com sucesso',200);
  //   } catch (error) {
  //     console.log(error);
  //     return errorResponse(res,'Server Error',500)   
  //   }
  // }
  // async deleteAdmin (req: Request, res: Response, ): Promise<unknown> {
  //   try {
  //     const { id } = req.params;
   
  //     const updateAdmin = await this.adminService.update(parseInt(id, 10),req.body);
  //     return successResponse(res,updateAdmin,'Admin Atualizado com sucesso',200);
  //   } catch (error) {
  //     console.log(error);
  //     return errorResponse(res,'Server Error',500)   
  //   }
  // }
  
}
