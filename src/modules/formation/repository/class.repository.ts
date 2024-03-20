import prisma from "../../../config/lib/prisma";
import { CreateClassDTO } from "../dto/create-class.dto";
export class ClassRepository {
    async create(createClassDTO: CreateClassDTO) {
        return await prisma.class.create({ data: createClassDTO });
    }
    async findAll() {
        return await prisma.class.findMany({})
    }
    async findById(Id: number) {
        return await prisma.class.findFirst({ where: { id: Id } })
    }
  
    async update(Id: number, data: any) {
        return await prisma.class.update({ where: { id: Id }, data })
    }
    async delete(Id: number) {
        return await prisma.class.delete({ where: { id: Id } })
    }

}