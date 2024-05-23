import { errorResponse, successResponse } from "../../handler/responseHandler";
import { AvaliationService } from "../service/avaliation.service";
import { Request, Response } from 'express';

export class AvaiationController { 
    constructor(
      private readonly avaliationService: AvaliationService,
      
    ) {
      console.log('AvaliationService constructor - avaliationService:', this.avaliationService);
     
   }

   async create(req: Request, res: Response, ): Promise<unknown> {
    try { 
    

  
      return successResponse(res,'','Turma cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
}
  
  