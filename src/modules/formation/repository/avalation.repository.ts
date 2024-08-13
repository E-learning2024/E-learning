import { prisma } from "../../../config/lib/prisma";
import { CreateAvaliationDTO } from "../dto/create-avaliation.dto";

export class AvaliationRepository {
      async create(data: CreateAvaliationDTO) {
        return await prisma.avaliation.create({ data });
     }
     async findAll() {
      const  _count = await prisma.avaliation.count();
      const  avaluation = await prisma.avaliation.findMany()
      return {
        _count ,
         avaluation
      }
     }
     async findById(id: number) {
        return await prisma.avaliation.findUnique({ where: { id } });
     }
     async findByIdClass (id: number) {
        return await prisma.avaliation.findFirst({ where: { classId: id } });
     }
     async update(id: number, data: CreateAvaliationDTO) {
        return await prisma.avaliation.update({ where: { id }, data });
     }
     async delete(id: number) {
        return await prisma.avaliation.delete({ where: { id } });
     }
}