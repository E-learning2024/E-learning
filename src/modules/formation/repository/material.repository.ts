import {prisma} from "../../../config/lib/prisma";
import { CreateMaterialDTO } from "../dto/create-material.dto";
import { UpdateMaterialDTO } from "../dto/update-material.dto";
export class MaterialRepository {
    async create(createMaterialDTO: CreateMaterialDTO) {
        return await prisma.material.create({ data: createMaterialDTO });
    }
    async findAll() {
        const _count = await prisma.material.count();
        const m =await prisma.material.findMany({ select: {
            id: true,
            title: true,
            description: true,
            fileUrl: true,
            classId: true,
            class: true
           }})
        return {
            _count ,
           material:m

        }
    }
    async findById(Id: number) {
        return await prisma.material.findUnique({ where: { id: Id } , select: {
            id: true,
            title: true,
            description: true,
            fileUrl: true,
            classId: true,
            class: true
           }})
    }
    async findByIdClass(Id: number) {
        return await prisma.material.findMany({ where: { classId: Id } ,   select: {
               id: true,
               title: true,
               description: true,
               fileUrl: true,
               classId: true,
               class: true
              }})
    }
  

    async update(Id: number, data: UpdateMaterialDTO) {
        return await prisma.material.update({ where: { id: Id }, data })
    }
    async delete(Id: number) {
        return await prisma.material.delete({ where: { id: Id } })
    }

}