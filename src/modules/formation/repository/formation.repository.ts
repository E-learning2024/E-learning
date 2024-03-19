import prisma from "../../../config/lib/prisma";
import { CreateFormationDTO } from "../dto/create-formation.dto";
export class FormationRepository {
    async create(createFormationDTO: CreateFormationDTO) {
        return await prisma.formation.create({ data: createFormationDTO });
    }
    async findAll() {
        return await prisma.formation.findMany({ where: { isActive: true } })
    }
    async findById(Id: number) {
        return await prisma.formation.findFirst({ where: { id: Id } })
    }
  
    async update(Id: number, data: any) {
        return await prisma.administrator.update({ where: { id: Id }, data })
    }
    async delete(Id: number) {
        return await prisma.formation.delete({ where: { id: Id } })
    }
    async activateFormation(Id: number) {
        return await prisma.formation.update({ where: { id: Id }, data: { isActive: true } })
    }
     async deactivateFormation(Id: number) {
        return await prisma.formation.update({ where: { id: Id }, data: { isActive: false } })
    }
}