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
      
      // const { startDate, endDate, ...rest } = req.body;

      // const startDateObject = new Date(startDate); // Converte a string para objeto Date
      // const endDateObject = new Date(endDate); // Converte a string para objeto Date
    
      // const newRequest = {
      //   ...rest, // Copia o restante dos campos do req.body
      //   startDate: startDateObject.toISOString(), // Substitui a string de startDate pelo objeto Date
      //   endDate: endDateObject.toISOString(),     // Substitui a string de endDate pelo objeto Date
      // };
       const create = await this.formationService.create( req.body);
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
  async deleteFormation(req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      const instructor = await this.formationService.findByid(parseInt(Id, 10));
      if(!instructor){
        return errorResponse(res,'formation not found !',401)  
      }
      return successResponse(res,await this.formationService.delete(parseInt(Id, 10)),'formation Deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
  async updateFormation(req: Request, res: Response, ): Promise<unknown> {
    try {
      const { Id } = req.params;
      // const { startDate, endDate, ...rest } = req.body;

      // const startDateObject = new Date(startDate); // Converte a string para objeto Date
      // const endDateObject = new Date(endDate); // Converte a string para objeto Date
    
      // const newRequest = {
      //   ...rest, // Copia o restante dos campos do req.body
      //   startDate: startDateObject.toISOString(), // Substitui a string de startDate pelo objeto Date
      //   endDate: endDateObject.toISOString(),     // Substitui a string de endDate pelo objeto Date
      // };
    
      const formation = await this.formationService.update(parseInt(Id, 10),req.body);
      return successResponse(res,formation,'formação Atualizado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
 
}
