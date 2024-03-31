import {prisma} from "../../../config/lib/prisma";
import { CreateStudentDTO } from "../dto/create-students.dto";
export class StudentRepository {
    async create(createStudentDTO: CreateStudentDTO) {
        return await prisma.student.create({ data: createStudentDTO });
    }
    async findAll() {
        return await prisma.student.findMany({ where: { isActive: true } })
    }
    async findById(Id: number) {
        return await prisma.student.findFirst({ where: { id: Id } })
    }
    async findByEmail(email: string) {
        return await prisma.student.findFirst({ where: { email: email } })
    }
    async findPhone(phone: string) {
        return await prisma.student.findFirst({ where: { phone: phone } })
    }
    async update(Id: number, data: any) {
        return await prisma.student.update({ where: { id: Id }, data })
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