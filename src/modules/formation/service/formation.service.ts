import { CreateFormationDTO } from "../dto/create-formation.dto";
import { UpdateAdministratorDTO } from "../dto/update-cours.dto";
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

  async update(id: number, updateAdministratorDTO: UpdateAdministratorDTO) {

    return await this.formationRepository.update(id, updateAdministratorDTO);
  }

  async remove(id: number) {
    return await this.formationRepository.delete(id);
  }
}
