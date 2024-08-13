import { CreateLeadDTO } from "../dto/create-leads.dto";
import { LeadsRepository } from "../repository/leads.repository";




export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository,
   
  ) 
  {

  }
  async create(createStudentDTO: CreateLeadDTO) {
    return await this.leadsRepository.create(createStudentDTO)
  } 

}
