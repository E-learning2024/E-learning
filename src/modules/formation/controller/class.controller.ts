import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../handler/responseHandler';
import { ClassService } from '../service/class.service';
import { FormationService } from '../service/formation.service';
import { InstructorService } from '../../instructor/service/instructor.service';
import { Materialervice } from '../service/material.service';

export class ClassController { 
  constructor(
    private readonly classService: ClassService,
    private readonly formationService: FormationService,
    private readonly instructorService: InstructorService,
    private readonly materialervice: Materialervice,
  ) {
    console.log('ClassService constructor - classService:', this.classService);
    console.log('FormationService constructor - classService:', this.formationService);
    console.log('Materialervice constructor - classService:', this.materialervice);
 }


   async create(req: Request, res: Response, ): Promise<unknown> {
    try { 
    const {instructorId,formationId}= req.body
    const formation =await this.formationService.findByid(parseInt(formationId))
    if(!formation) {
      return errorResponse(res,`Formação não encontrado`,401)  
    }

    const Instructor = await this.instructorService.findById(parseInt(instructorId))
      if(!Instructor){
        return errorResponse(res,'Instructor not found !',401)  
      }
       const create = await this.classService.create(req.body);
      return successResponse(res,create,'Turma cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async update(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id}= req.params
      const { instructorId, formationId } = req.body;
 
      if (formationId) {
        const  formation = await this.formationService.findByid(parseInt(formationId));
        if (!formation) {
          return errorResponse(res, `Formação não encontrada`, 404);
        }
      }
      
      if (instructorId) {
      const   instructor = await this.instructorService.findById(parseInt(instructorId));
        if (!instructor) {
          return errorResponse(res, 'Instrutor não encontrado', 404);
        }
      }
       const create = await this.classService.update(parseInt(Id),req.body);
      return successResponse(res,create,'Atualizado  com sucesso',201);
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
      const { Id } = req.params;
      const cla = await this.classService.findByid(parseInt(Id, 10));
      if(!cla){
        return errorResponse(res,'class not found !',401)  
      }
      return successResponse(res,await this.classService.delete(parseInt(Id, 10)),'Class Deletado com sucesso',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)   
    }
  }

  //Material 
  async createMaterial(req: Request, res: Response, ): Promise<unknown> {
    try { 
    const {classId}= req.body
    const file = req.file ? req.file.filename : "unknown-url-file.json";
    const cla = await this.classService.findByid(parseInt(classId, 10));
    if(!cla){
      return errorResponse(res,'class not found !',401)  
    }
       const newRequeste = { ...req.body,fileUrl:file }
       const create = await this.materialervice.create(newRequeste);
      return successResponse(res,create,'Material cadastrado com sucesso',201);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findByIdClass(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {classId} = req.params
      const cla = await this.classService.findByid(parseInt(classId, 10));
      if(!cla){
        return errorResponse(res,'class not found !',401)  
      }
      return successResponse(res,await this.materialervice.findByIdClass(parseInt(classId)),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findByIdMaterial(req: Request, res: Response, ): Promise<unknown> {
    try { 
      const {Id} = req.params
      const cla = await this.materialervice.findByid(parseInt(Id, 10));
      if(!cla){
        return errorResponse(res,'Material not found !',401)  
      }
      return successResponse(res,await this.materialervice.findByid(parseInt(Id)),'',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
  async findByAllMaterial(req: Request, res: Response, ): Promise<unknown> {
    try { 
     
      return successResponse(res,await this.materialervice.findAll(),'...',200);
    } catch (error) {
      console.log(error);
      return errorResponse(res,'Server Error',500)  
    }
  }
}
