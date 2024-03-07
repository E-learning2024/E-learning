import { Request, Response } from 'express';
import { AdmimService } from './../service/admin.service';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { autenticationService } from '../../../utils/authentication/authentication';

export class AdminController {
  constructor(private readonly adminService: AdmimService) {}

  async createAdmin(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const newRequest ={ ...req.body,password:await autenticationService.encryptPassword(req.body.password)}
   //  const createdInspection = await this.adminService.create(newRequest);
      return successResponse(res,newRequest,'Admin cadastrado com secesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
}
