import {prisma} from "../../../config/lib/prisma";
import { CreateClassDTO } from "../dto/create-class.dto";
import { UpdateClassDTO } from "../dto/update-class.dto";
export class ClassRepository {
    async create(createClassDTO: CreateClassDTO) {
        return await prisma.class.create({ 
            data:{
                formationId:createClassDTO.formationId,
                name:createClassDTO.name,
                description:createClassDTO.description,
                time:createClassDTO.time,
                student_quantity:createClassDTO.student_quantity,
                instructors: {
                    connect: createClassDTO.instructors,
                  },
            },
            include: { instructors: true },
         });
    }
    async findAll() {
        return await prisma.class.findMany({select: {
            id: true,
            formationId: true,
            name: true,
            description: true,
            time: true,
            student_quantity: true,
            instructors: true,
            current_student_number:true,
            formation: true,
            material: true,
            enrollment: true,
            _count: true
            } })
    }
    async findAllClassByIdInstructor(id:number) {
        return await prisma.class.findMany({
            where: {
                instructors: {
                  some: {
                    id:id
                  }
                }
              },
              include: {
                formation: true,
                _count: true,
                instructors:true
              }
        } )
    }
    async findById(Id: number) {
        return await prisma.class.findFirst({ where: { id: Id }, select: {
              id: true,
              instructors: true,
              formationId: true,
              name: true,
              description: true,
              time: true,
              student_quantity: true,
              current_student_number:true,
              formation: true,
              material: true,
              enrollment: true,
              _count: true
              } })
    }
  
    async update(Id: number, data: UpdateClassDTO) {
        return await prisma.class.update({ where: { id: Id }, 
            data:{
                formationId:data.formationId,
                name:data.name,
                description:data.description,
                time:data.time,
                student_quantity:data.student_quantity,
                instructors: {
                    connect: data.instructors,
                  },
            },
            include: { instructors: true },
          })
    }
    async updateQuantity(Id: number, current_student_number: number) {
        return await prisma.class.update({ where: { id: Id }, data: { current_student_number: current_student_number}})
    }
    async delete(Id: number) {
        return await prisma.class.delete({ where: { id: Id } })
    }

}