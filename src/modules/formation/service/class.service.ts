import { Status } from "../../students/dto/create-enrollment.dto";
import { EnrollmentRepository } from "../../students/repository/enrollment.repository";
import { CreateClassDTO } from "../dto/create-class.dto";
import { UpdateClassDTO } from "../dto/update-class.dto";
import { ClassRepository } from "../repository/class.repository";

 export class ClassService {
  constructor(private readonly classRepository: ClassRepository,
    private readonly enrollmentRepository:EnrollmentRepository,
  )
  
   {
    console.log('ClassRepository constructor - classRepository:', this.classRepository);
  }
  async create(createClassDTO: CreateClassDTO) {
    return await this.classRepository.create(createClassDTO)
  }

  async findAll() {
    return await this.classRepository.findAll();
  }

  async findByid(id: number) {
    return await this.classRepository.findById(id);
  }
  async findAllClassByIdInstructor(id: number) {
    return await this.classRepository.findAllClassByIdInstructor(id);
  }

  async update(id: number, data: UpdateClassDTO) {

    return await this.classRepository.update(id, data);
  }
  async findStudentByClassId(id: number,status:Status) {

    return await this.enrollmentRepository.findStudentByClassId(id,status);
  }
  async updateQuantity(Id: number, current_student_number: number) {

    return await this.classRepository.updateQuantity(Id, current_student_number);
  }


  async delete(id: number) {
    return await this.classRepository.delete(id);
  }
  async findAllMaterialByIdInstructor(Id: number) {
    return await this.classRepository.findAllMaterialByIdInstructor(Id);
  }
}
