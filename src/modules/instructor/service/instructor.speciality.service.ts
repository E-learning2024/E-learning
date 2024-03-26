
import { CreatespecialityInstructorDTO } from "../dto/instructor-specialty-create";
import { UpatespecialityInstructorDTO } from "../dto/instructor-specialty-update";
import { SpecialtyInstructorRepository } from "../repository/instructor.speciality.repository";
export class SpecialityInstructorService {
    constructor(private readonly specialtyInstructorRepository: SpecialtyInstructorRepository) {
      console.log('SpecialtyInstructorRepository constructor - specialtyInstructorRepository:', this.specialtyInstructorRepository);
    }
    async createAttendance(createspecialityInstructorDTO: CreatespecialityInstructorDTO) {
      return await this.specialtyInstructorRepository.createSpeciality(createspecialityInstructorDTO)
    }
      async findAllSpecialityByIdInstructor(Id:number) {
        return await this.specialtyInstructorRepository.findAllSpecialityIdInstructor(Id);
      }
      async deleteSpeciality(Id:number) {
        return await this.specialtyInstructorRepository.deleteSpeciality(Id);
      }
      async updateSpeciality(Id:number,upatespecialityInstructorDTO:UpatespecialityInstructorDTO) {
        return await this.specialtyInstructorRepository.updateSpeciality(Id,upatespecialityInstructorDTO);
      }
   
  
   
  }
  