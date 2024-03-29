import { CreateFormationDTO } from "../dto/create-formation.dto";
import { UpdateFormationDTO } from "../dto/update-formation.dto";
import { FormationRepository } from "../repository/formation.repository";

export class FormationService {
  constructor(private readonly formationRepository: FormationRepository) {
    console.log('FormationRepository constructor - formationRepository:', this.formationRepository);
  }
  async create(createFormationDTO: CreateFormationDTO) {
    return await this.formationRepository.create(createFormationDTO)
  }

  async findAll() {
    return await this.formationRepository.findAll();
  }

  async findByid(id: number) {
    return await this.formationRepository.findById(id);
  }

  async update(id: number, updateFormationDTO: UpdateFormationDTO) {

    return await this.formationRepository.update(id, updateFormationDTO);
  }

  async delete(id: number) {
    return await this.formationRepository.delete(id);
  }
}
