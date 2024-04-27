import { CreateEnrollmentDTO } from "../dto/create-enrollment.dto";
import { CreateStudentDTO } from "../dto/create-students.dto";
import { EnrollmentRepository } from "../repository/enrollment.repository";
import { StudentRepository } from "../repository/students.repository";


export class StudentService {
  constructor(private readonly studentRepository: StudentRepository,
    private readonly enrollmentRepository:EnrollmentRepository
  ) 
  {
    console.log('StudentRepository constructor - studentRepository:', this.studentRepository);
    console.log('EnrollmentRepository constructor - enrollmentRepository:', this.enrollmentRepository);
  }
  async create(createStudentDTO: CreateStudentDTO) {
    return await this.studentRepository.create(createStudentDTO)
  }

  async findAll() {
    return await this.studentRepository.findAll();
  }

  async findByid(id: number) {
    return await this.studentRepository.findById(id);
  }
  async findByEmail(email: string) {
    return await this.studentRepository.findByEmail(email);
  }
  async findByPhone(phone: string) {
    return await this.studentRepository.findPhone(phone);
  }
  
  async findByNif(nif: string) {
    return await this.studentRepository.findByNif(nif);
  }

  async update(id: number, updateAdministratorDTO: any) {

    return await this.studentRepository.update(id, updateAdministratorDTO);
  }
  async delete(id: number) {
    return await this.studentRepository.delete(id);
  }
  async createnrollment(createEnrollmentDTO: CreateEnrollmentDTO) {
    return await this.enrollmentRepository.create(createEnrollmentDTO)
  }
  async findStudentByIdandClass(studentId:number,classId:number) {
    return await this.enrollmentRepository.findStudentByIdandClass(studentId,classId);
  }
  async findStudentByIdForEnrollma(studentId:number) {
    return await this.enrollmentRepository.findStudentByIdForEnrollma(studentId);
  }


}
