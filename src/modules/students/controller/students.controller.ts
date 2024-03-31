import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { StudentService } from '../service/student.service';
import { MessagesResponse } from '../../handler/messagesResponse';

export class StudentController { 
  constructor(
    private readonly studentService: StudentService,
    private readonly authenticationService: AuthenticationService
  ) {
    console.log('StudentController constructor - studentService:', this.studentService);
    console.log('StudentController constructor - authenticationService:', this.authenticationService);
  }


  async createStudent(req: Request, res: Response, ): Promise<unknown> {
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
       const student = await this.studentService.create(newRequest);
      return successResponse(res,student,MessagesResponse.DATA_ENTERED,201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async findAllStudent(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.studentService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async findOneStudent(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}=req.params
      const student = await this.studentService.findByid(parseInt(Id))
      if(!student){
        return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,401)  
      }
      return successResponse(res,student,MessagesResponse.DATA_FOUND_SUCESS,200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async sign(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const Student = await this.studentService.findByEmail(req.body.email)
      if(!Student){
        return errorResponse(res,'Student not found !',401)  
      }
      const verify = await this.authenticationService.comparePasswords(req.body.password,Student.password)
     if(!verify){
      return errorResponse(res,'Senha Incorrecta !',401)  
     }
     const StudentWithRole = {
      ...Student,
      role: 'STUDENT'
    };
      const token = await this.authenticationService.generateToken(StudentWithRole)
      return successResponse(res,token,'Seu token !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  // async updateAdmin (req: Request, res: Response, ): Promise<unknown> {
  //   try {
  //     const { id } = req.params;
   
  //     const updateAdmin = await this.studentService.update(parseInt(id, 10),req.body);
  //     return successResponse(res,updateAdmin,'Admin Atualizado com sucesso',200);
  //   } catch (error) {
  //     console.log(error);
  //     return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
  //   }
  // }
  async deleteStudent (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { id } = req.params;
      const student = await this.studentService.findByid(parseInt(id, 10));
      if(!student){
        return errorResponse(res,'student not found !',401)  
      }
      const deletedstudent = await this.studentService.delete(parseInt(id, 10));
      return successResponse(res,deletedstudent,'student deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  
}
