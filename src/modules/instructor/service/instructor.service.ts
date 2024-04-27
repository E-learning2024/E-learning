import { CreateInstructorDTO } from "../dto/instructor-create";
import { UpdateInstructorDTO } from "../dto/instructor-update";
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
      async findByNif(nif: string) {
        return await this.instructorRepository.findByNif(nif);
      }
      async findAll() {
        return await this.instructorRepository.findAll();
      }
      async delete(Id:number) {
        return await this.instructorRepository.delete(Id);
      }
      async activateAccount(Id:number) {
        return await this.instructorRepository.activateAccount(Id);
      }
      async deactivateAccount(Id:number) {
        return await this.instructorRepository.deactivateAccount(Id);
      }
      async findById(Id:number) {
        return await this.instructorRepository.findById(Id);
      }
      async update(Id:number,updateInstructorDTO:UpdateInstructorDTO) {
        return await this.instructorRepository.update(Id,updateInstructorDTO);
      }
  
   
  }
  