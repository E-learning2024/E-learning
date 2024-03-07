
import { CreateAdministratorDTO } from "../../admin/dto/create-admin.dto";
import { AdmimRepository } from "../repository/admin.repository";

export class AdmimService { 
  constructor(private readonly adminRepository: AdmimRepository) {}
    create(createAdministratorDTO: CreateAdministratorDTO) {
       return this.adminRepository.create(createAdministratorDTO)
     }
  
    findAll() {
    //   return prisma.regularInspection.findMany({
    //     include: {
    //       user: true,
    //       vehicleInspection: true,
    //       anexos: true,
    //     },
    //   });
    }
  
    findOne(id: number) {
      return `This action returns a #${id} inspection`;
    }
  
    update(id: number, updateInspectionDto: any) {
      return `This action updates a #${id} inspection`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} inspection`;
    }
  }
  