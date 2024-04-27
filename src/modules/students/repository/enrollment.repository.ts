import {prisma} from "../../../config/lib/prisma";
import { CreateEnrollmentDTO, Status } from "../dto/create-enrollment.dto";
import { UpdateEnrollmentDTO } from "../dto/update-enrollment.dto";

export class EnrollmentRepository {
    async create(createEnrollmentDTO: CreateEnrollmentDTO) {
        return await prisma.enrollment.create({ data: createEnrollmentDTO });
    }
    async findAll() {
        return await prisma.enrollment.findMany({ })
    }
    async findStudentByIdandClass(studentId:number,classId:number) {
        return await prisma.enrollment.findFirst({where: {studentId: studentId, classId: classId} , select: {
               id: true,
               studentId: true,
               classId: true,
               status: true,
               student: true,
               class: true
              }})
    }
    async findStudentByIdForEnrollma(studentId:number) {
        return await prisma.enrollment.findFirst({where: {studentId: studentId},  select: {
               id: true,
               studentId: true,
               classId: true,
               status: true,
               student: true,
               class: true
              }})
    }
    async findById(studentId: number) {
        return await prisma.enrollment.findMany({ where:{studentId:studentId}})
    }

    async update(Id: number, data: UpdateEnrollmentDTO) {
        return await prisma.enrollment.update({ where: { id: Id },data })
    }
    async delete(Id: number) {
        return await prisma.enrollment.delete({ where: { id: Id } })
    }
    async findEnrollmentByState(status: Status) {
        return await prisma.enrollment.findMany({ where: { status: status },include:{
            student: true,
            class: {
                include: {
                    formation: true
                }
            }
        } })
    }
    async updateEnrollmentByState(Id: number,status: Status) {
        return await prisma.enrollment.update({ where: { id: Id },data:{
            status: status
        },include:{
            student: true,
            class: {
                include: {
                    formation: true
                }
            }
        } })
    }
}