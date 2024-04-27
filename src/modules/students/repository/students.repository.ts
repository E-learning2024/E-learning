import {prisma} from "../../../config/lib/prisma";
import { CreateStudentDTO } from "../dto/create-students.dto";
export class StudentRepository {
    async create(createStudentDTO: CreateStudentDTO) {
        return await prisma.student.create({ data: createStudentDTO ,select: {
            id: true,
            Studentname: true,
            email: true,
            nif: true,
            phone: true,
            password: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            activityHistoryStudent: true,
            enrollment: true,
            _count: true
             } });
    }
    async findAll() {
        return await prisma.student.findMany({ where: { isActive: true },  select: {
            id: true,
            Studentname: true,
            email: true,
            nif: true,
            phone: true,
            password: false,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            activityHistoryStudent: true,
            enrollment: true,
            _count: true
             } })
    }
    async findById(Id: number) {
        return await prisma.student.findFirst({ where: { id: Id },  select: {
             id: true,
             Studentname: true,
             email: true,
             nif: true,
             phone: true,
             password: true,
             firstName: true,
             lastName: true,
             dateOfBirth: true,
             isActive: true,
             createdAt: true,
             updatedAt: true,
             activityHistoryStudent: true,
             enrollment: true,
             _count: true
              } })
    }
    async findByEmail(email: string) {
        return await prisma.student.findFirst({ where: { email: email } })
    }
    async findByNif(nif: string) {
        return await prisma.student.findFirst({ where: { nif: nif } })
    }
    async findPhone(phone: string) {
        return await prisma.student.findFirst({ where: { phone: phone } })
    }
    async update(Id: number, data: any) {
        return await prisma.student.update({ where: { id: Id }, data,select: {
            id: true,
            Studentname: true,
            email: true,
            nif: true,
            phone: true,
            password: false,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            activityHistoryStudent: true,
            enrollment: true,
            _count: true
             }  })
    }
    async delete(Id: number) {
        return await prisma.student.delete({ where: { id: Id } })
    }
    async activateAccount(Id: number) {
        return await prisma.student.update({ where: { id: Id }, data: { isActive: true } })
    }
    async deactivateAccount(Id: number) {
        return await prisma.student.update({ where: { id: Id }, data: { isActive: false } })
    }
}