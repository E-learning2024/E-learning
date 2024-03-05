import { Request, Response } from 'express';
import { AdmimService } from '../../service/admin.service';

export class InspectionController {
  constructor(private readonly adminService: AdmimService) {}

  async createAdmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
    
      const createdInspection = await Promise.resolve(this.adminService.create(req.body));
      return res.json(createdInspection);
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  }
}
