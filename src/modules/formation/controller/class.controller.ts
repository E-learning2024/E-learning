import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { ClassService } from '../service/class.service';

export class ClassController { 
  constructor(
    private readonly classService: ClassService
  ) {
    console.log('ClassService constructor - classService:', this.classService);
 }


   async create(req: Request, res: Response, ): Promise<unknown> {
    try { 
    
       const create = await this.classService.create(req.body);
      return successResponse(res,create,'Formação cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findAllClass(req: Request, res: Response, ): Promise<unknown> {
    try { 
      return successResponse(res,await this.classService.findAll(),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findOneClass(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id} = req.params
      return successResponse(res,await this.classService.findByid(parseInt(Id)),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async deleteClass(req: Request, res: Response, ): Promise<unknown> {
    try {
      const { id } = req.params;
      const cla = await this.classService.findByid(parseInt(id, 10));
      if(!cla){
        return errorResponse(res,'class not found !',401)  
      }
      return successResponse(res,await this.classService.delete(parseInt(id, 10)),'Class Deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }
 
}
