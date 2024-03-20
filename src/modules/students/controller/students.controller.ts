import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { StudentService } from '../service/student.service';

export class StudentController { 
  constructor(
    private readonly studentService: StudentService,
    private readonly authenticationService: AuthenticationService
  ) {
    console.log('StudentController constructor - studentService:', this.studentService);
    console.log('StudentController constructor - authenticationService:', this.authenticationService);
  }


  async createAdmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const newRequest ={ ...req.body,password:await this.authenticationService.encryptPassword(req.body.password)}
    const verifyEmail=  await this.studentService.findByEmail(req.body.email)
    if(verifyEmail) {
      return errorResponse(res,`Este email:  ${req.body.email}  ja se encontra cadatrado`,400)  
    }
    const verifyPhone=  await this.studentService.findByPhone(req.body.phone)
    if(verifyPhone) {
      return errorResponse(res,`Este contacto : ${req.body.phone} ja se encontra cadatrado`,400)  
    }
       const createdAdmin = await this.studentService.create(newRequest);
      return successResponse(res,createdAdmin,'Admin cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findAlladmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.studentService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findOneadmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}=req.params
      const admin = await this.studentService.findByid(parseInt(Id))
      console.log(admin)
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      return successResponse(res,admin,'user found !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async sign(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const admin = await this.studentService.findByEmail(req.body.email)
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
  async updateAdmin (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { id } = req.params;
   
      const updateAdmin = await this.studentService.update(parseInt(id, 10),req.body);
      return successResponse(res,updateAdmin,'Admin Atualizado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async deleteAdmin (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { id } = req.params;
      const admin = await this.studentService.findByid(parseInt(id, 10));
      if(!admin){
        return errorResponse(res,'Admin not found !',401)  
      }
      const updateAdmin = await this.studentService.update(parseInt(id, 10),req.body);
      return successResponse(res,updateAdmin,'Admin deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  
}
