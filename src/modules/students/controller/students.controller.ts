import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { StudentService } from '../service/student.service';
import { MessagesResponse } from '../../handler/messagesResponse';
import { ClassService } from '../../formation/service/class.service';
import { enviarEmail } from '../../../utils/shared/sendMail';
import { criarEmailDeConfirmacao } from '../../../utils/shared/template';

export class StudentController { 
  constructor(
    private readonly studentService: StudentService,
    private readonly authenticationService: AuthenticationService,
    private readonly classService: ClassService
  ) {
    console.log('StudentController constructor - studentService:', this.studentService);
    console.log('StudentController constructor - authenticationService:', this.authenticationService);
    console.log('StudentController constructor - authenticationService:', this.classService);
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
  async updatestudent (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const student = await this.studentService.findByid(parseInt(Id))
      if(!student){
        return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,401)  
      }
      const newRequest = {
        ...req.body,
        password: req.body.password != null ? await this.authenticationService.encryptPassword(req.body.password) : student.password
      };
      
      const updateAdmin = await this.studentService.update(parseInt(Id, 10),newRequest);
      return successResponse(res,updateAdmin,'student Atualizado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async deleteStudent (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const student = await this.studentService.findByid(parseInt(Id, 10));
      if(!student){
        return errorResponse(res,'student not found !',401)  
      }
      const deletedstudent = await this.studentService.delete(parseInt(Id, 10));
      return successResponse(res,deletedstudent,'student deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)   
    }
  }
  async createnrollment(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {studentId,classId}=req.body;

    const student = await this.studentService.findByid(parseInt(studentId))
    if(!student){
      return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,401)  
    }
    const classverify = await this.classService.findByid(parseInt(classId))
      if(!classverify){
      return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,401)  
    }
   
  if (classverify && classverify.student_quantity && classverify.student_quantity > 45) {
   // Pesquisar outra class para esta formação e inserir este estudante 
   // Ou posso escolher outra turma , porque esta ja esta cheia
    return errorResponse(res,MessagesResponse.FULL_CLASS,401)  
 }
    const verify = await this.studentService.findStudentByIdandClass(parseInt(studentId),parseInt(classId))
    if(verify){
      return errorResponse(res,MessagesResponse.STUDENT_EARLY_ENROLLMENT,401)  
    }
  
       const enrollment = await this.studentService.createnrollment(req.body);
       if(enrollment){
        const student_quantity = classverify && classverify.student_quantity ? classverify.student_quantity + 1 : 1;
        await this.classService.updateQuantity(parseInt(classId), student_quantity);
       }
       //send Mail Message
       const destinatario = student.email;
       const assunto = 'Confirmação de Inscrição e Detalhes de Pagamento ';
       const anexo = 'src/utils/shared/fatura.pdf'; 
       const name = `${student.firstName} ${student.firstName}`
       const emailHtml = await criarEmailDeConfirmacao(assunto,name);
      await enviarEmail(destinatario, assunto, emailHtml, anexo);
      return successResponse(res,enrollment,MessagesResponse.DATA_ENTERED,201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  async findStudentByIdForEnrollma(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}=req.params
      const student = await this.studentService.findByid(parseInt(Id))
      if(!student){
        return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,401)  
      }
      return successResponse(res,await this.studentService.findStudentByIdForEnrollma(parseInt(Id)),MessagesResponse.DATA_FOUND_SUCESS,200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,MessagesResponse.SERVER_ERROR,500)  
    }
  }
  
}
