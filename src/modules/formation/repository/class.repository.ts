import {prisma} from "../../../config/lib/prisma";
import { CreateClassDTO } from "../dto/create-class.dto";
import { UpdateClassDTO } from "../dto/update-class.dto";
export class ClassRepository {
    async create(createClassDTO: CreateClassDTO) {
        return await prisma.class.create({ data: createClassDTO });
    }
    async findAll() {
        return await prisma.class.findMany({select: {
            id: true,
            instructorId: true,
            formationId: true,
            name: true,
            description: true,
            time: true,
            student_quantity: true,
            instructor: true,
            formation: true,
            material: true,
            enrollment: true,
            _count: true
            } })
    }
    async findById(Id: number) {
        return await prisma.class.findFirst({ where: { id: Id }, select: {
              id: true,
              instructorId: true,
              formationId: true,
              name: true,
              description: true,
              time: true,
              student_quantity: true,
              instructor: true,
              formation: true,
              material: true,
              enrollment: true,
              _count: true
              } })
    }
  
    async update(Id: number, data: UpdateClassDTO) {
        return await prisma.class.update({ where: { id: Id }, data })
    }
    async delete(Id: number) {
        return await prisma.class.delete({ where: { id: Id } })
    }

}