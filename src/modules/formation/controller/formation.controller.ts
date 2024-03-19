import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { FormationService } from '../service/formation.service';

export class FormationController { 
  constructor(
    private readonly formationService: FormationService
  ) {
    console.log('FormationController constructor - formationService:', this.formationService);
 }


  async create(req: Request, res: Response, ): Promise<unknown> {
    try { 
    
       const create = await this.formationService.create(req.body);
      return successResponse(res,create,'Formação cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findAllFormation(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.formationService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findOneFormation(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id} = req.params
      return successResponse(res,await this.formationService.findByid(parseInt(Id)),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
 
}
