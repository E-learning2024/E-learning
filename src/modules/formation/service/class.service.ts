import { CreateClassDTO } from "../dto/create-class.dto";
import { ClassRepository } from "../repository/class.repository";

 export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {
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

  // async update(id: number, updateAdministratorDTO: UpdateAdministratorDTO) {

  //   return await this.classRepository.update(id, updateAdministratorDTO);
  // }

  async delete(id: number) {
    return await this.classRepository.delete(id);
  }
}
