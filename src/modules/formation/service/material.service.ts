
import { CreateMaterialDTO } from "../dto/create-material.dto";
import { UpdateMaterialDTO } from "../dto/update-material.dto";
import { MaterialRepository } from "../repository/material.repository";
import { supabase } from "../../../config/lib/supabaseClient";

 export class Materialervice {
  constructor(private readonly materialRepository: MaterialRepository) {
    console.log('MaterialRepository constructor - materialRepository:', this.materialRepository);
  }

  async create(createClassDTO: CreateMaterialDTO) {
    return await this.materialRepository.create(createClassDTO)
  }  

 
/*
  async create(createMaterialDTO: CreateMaterialDTO, filePath: string, file: File) {
    const { error } = await supabase.storage.from('arquivo').upload(filePath, file);
    if (error) throw new Error(error.message);
    return await this.materialRepository.create(createMaterialDTO);
  }
   */
  

  async findAll() {
    return await this.materialRepository.findAll();
  }

  async findByid(id: number) {
    return await this.materialRepository.findById(id);
  }

  async update(id: number, data: UpdateMaterialDTO) {

    return await this.materialRepository.update(id, data);
  }
  async findByIdClass(Id: number) {

    return await this.materialRepository.findByIdClass(Id);
  }


  async delete(id: number) {
    return await this.materialRepository.delete(id);
  }
}
