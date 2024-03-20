import { CreateStudentDTO } from "../dto/create-students.dto";
import { StudentRepository } from "../repository/students.repository";


export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {
    console.log('StudentRepository constructor - studentRepository:', this.studentRepository);
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

  async update(id: number, updateAdministratorDTO: any) {

    return await this.studentRepository.update(id, updateAdministratorDTO);
  }

  async delete(id: number) {
    return await this.studentRepository.delete(id);
  }
}
