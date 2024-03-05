import { Request, Response } from 'express';
import { AdmimService } from '../../service/admin.service';
import { CreateAdministratorDTO } from '../dto/create-admin.dto';

export class InspectionController {
  constructor(private readonly adminService: AdmimService) {}

  async createAdmin(req: Request, res: Response, createAdministratorDTO: CreateAdministratorDTO): Promise<unknown> {
    try { 
      
      const createdInspection = await Promise.resolve(this.adminService.create(createAdministratorDTO));
      return res.json(createdInspection);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
}
