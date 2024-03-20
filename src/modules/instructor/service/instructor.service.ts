import { CreateInstructorDTO } from "../dto/instructor-create";
import { InstructorRepository } from "../repository/instructor.repository";

export class InstructorService {
    constructor(private readonly instructorRepository: InstructorRepository) {
      console.log('InstructorRepository constructor - instructorRepository:', this.instructorRepository);
    }
    async create(createInstructorDTO: CreateInstructorDTO) {
      return await this.instructorRepository.create(createInstructorDTO)
    }
    async findByEmail(email: string) {
        return await this.instructorRepository.findByEmail(email);
      }
      async findByPhone(phone: string) {
        return await this.instructorRepository.findPhone(phone);
      }
      async findAll() {
        return await this.instructorRepository.findAll();
      }
      async delete(Id:number) {
        return await this.instructorRepository.delete(Id);
      }
      async findById(Id:number) {
        return await this.instructorRepository.findById(Id);
      }
  
   
  }
  