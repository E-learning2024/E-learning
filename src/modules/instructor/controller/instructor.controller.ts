import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { AuthenticationService } from '../../../utils/authentication/authentication';
import { InstructorService } from '../service/instructor.service';
import { AttendanceInstructorService } from '../service/instructor.attendance.record.service';
import { SpecialityInstructorService } from '../service/instructor.speciality.service';

export class InstructorController { 
  constructor(
    private readonly instructorService: InstructorService,
    private readonly authenticationService: AuthenticationService,
    private readonly attendanceInstructorService:AttendanceInstructorService,
    private readonly specialityInstructorService:SpecialityInstructorService
  ) {
    console.log('InstructorController constructor - instructorService:', this.instructorService);
    console.log('InstructorController constructor - authenticationService:', this.authenticationService);
    console.log('AttendanceInstructorService constructor - attendanceInstructorService:', this.attendanceInstructorService);
    console.log('SpecialityInstructorService constructor - specialityInstructorService:', this.specialityInstructorService);
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
    const verifyNif=  await this.instructorService.findByNif(req.body.nif)
    if(verifyNif) {
      return errorResponse(res,`Este nif : ${req.body.nif} ja se encontra cadatrado`,400)  
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
  async findOneInstr(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}=req.params
      const Instructor = await this.instructorService.findById(parseInt(Id))
      if(!Instructor){
        return errorResponse(res,'Instructor not found !',401)  
      }
      return successResponse(res,Instructor,'Instructor found !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async sign(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const instructor = await this.instructorService.findByEmail(req.body.email)
      if(!instructor){
        return errorResponse(res,'instructor not found !',401)  
      }
      const verify = await this.authenticationService.comparePasswords(req.body.password,instructor.password)
     if(!verify){
      return errorResponse(res,'Senha Incorrecta !',401)  
     }
     const instructorWithRole = {
      ...instructor,
      role: 'INSTRUCTOR'
    };
      const token = await this.authenticationService.generateToken(instructorWithRole)
      return successResponse(res,token,'Seu token !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async updateInstr (req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const instructor = await this.instructorService.findById(parseInt(Id, 10));
      if(!instructor){
        return errorResponse(res,'instructor not found !',401)  
      }
      const newRequest = {
        ...req.body,
        password: req.body.password != null ? await this.authenticationService.encryptPassword(req.body.password) : instructor.password
      };
      
      const updateInstr = await this.instructorService.update(parseInt(Id, 10),newRequest);
      return successResponse(res,updateInstr,'Instruct Atualizado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async deleteInstructor(req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const instructor = await this.instructorService.findById(parseInt(Id, 10));
      if(!instructor){
        return errorResponse(res,'instructor not found !',401)  
      }
      return successResponse(res,await this.instructorService.delete(parseInt(Id, 10)),'Instructor Deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async createAttendanceRecord(req: Request, res: Response, ): Promise<unknown> {
    try {
      return successResponse(res,await this.attendanceInstructorService.createAttendance(req.body),'Presença Marcado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async updateAttendanceRecord(req: Request, res: Response, ): Promise<unknown> {
    try {
      const {Id}= req.params
      
      return successResponse(res,await this.attendanceInstructorService.updateAttendance(req.body,parseInt(Id)),'Presença Marcado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async findAllAttendance(req: Request, res: Response, ): Promise<unknown> {
    try {
      return successResponse(res,await this.attendanceInstructorService.findAllAttendance(),'Listas de Marcação de presença',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async findByIdInstructorAttendance(req: Request, res: Response, ): Promise<unknown> {
    try {
      const {Id}= req.params
      const instructor = await this.instructorService.findById(parseInt(Id, 10));
      if(!instructor){
        return errorResponse(res,'instructor not found !',401)  
      }
     
      return successResponse(res,await this.attendanceInstructorService.findByIdInstructor(parseInt(Id)),'Lista de Marcação de presença',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async deleteAttendance(req: Request, res: Response, ): Promise<unknown> {
    try {
      const {Id}= req.params
      const attendance= await this.attendanceInstructorService.findByIdInstructor(parseInt(Id))
      if(!attendance){
        return errorResponse(res,'Attendance Instructor not found !',401)  
      }
      return successResponse(res,await this.attendanceInstructorService.deleteAttendance(parseInt(Id)),'Presença Deletada !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async findByIdAttendance(req: Request, res: Response, ): Promise<unknown> {
    try {
      const {Id}= req.params
      const attendance= await this.attendanceInstructorService.findById(parseInt(Id))
      if(!attendance){
        return errorResponse(res,'Attendance Instructor not found !',401)  
      }
      return successResponse(res,attendance,'Presença  !',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }

  
}
