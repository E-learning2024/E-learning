
import { CreateAdministratorDTO } from "../../admin/dto/create-admin.dto";
import { CreateTeamAdministratorDTO } from "../dto/create-team-admin.dto";
import { UpdateAdministratorDTO } from "../dto/update-admin.dto";
import { UpdateTeamAdministratorDTO } from "../dto/update-team-admin.dto";
import { AdminRepository } from "../repository/admin.repository";

export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {
    console.log('AdminRepository constructor - adminRepository:', this.adminRepository);
  }
  async create(createAdministratorDTO: CreateAdministratorDTO) {
    return await this.adminRepository.create(createAdministratorDTO)
  }

  async findAll() {
    return await this.adminRepository.findAll();
  }

  async findByid(id: number) {
    return await this.adminRepository.findById(id);
  }
  async findByEmail(email: string) {
    return await this.adminRepository.findByEmail(email);
  }
  async findByPhone(phone: string) {
    return await this.adminRepository.findPhone(phone);
  }
  async findByNif(nif: string) {
    return await this.adminRepository.findByNif(nif);
  }

  async update(id: number, updateAdministratorDTO: UpdateAdministratorDTO) {

    return await this.adminRepository.update(id, updateAdministratorDTO);
  }
  async activateAccount(id: number) {
    return await this.adminRepository.activateAccount(id);
  }
  async deactivateAccount(id: number) {
    return await this.adminRepository.deactivateAccount(id);
  }

  async delete(id: number) {
    return await this.adminRepository.delete(id);
  }
  
 async createTeam(data: CreateTeamAdministratorDTO) {
   
    return await this.adminRepository.createTeam(data);
  }
  async updateTeam(data: UpdateTeamAdministratorDTO,Id:number) {
   
    return await this.adminRepository.updateTeam(data,Id);
  }
  async findAllTeam() {
    return await this.adminRepository.findAllTeam();
  }
  async findOneTeam(Id:number) {
    return await this.adminRepository.findOneTeam(Id);
  }
  async deleteTeam(Id:number) {
    return await this.adminRepository.deleteTeam(Id);
  }
}
