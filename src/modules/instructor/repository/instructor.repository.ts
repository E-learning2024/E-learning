import prisma from "../../../config/lib/prisma";
import { CreateInstructorDTO } from "../dto/instructor-create";
export class InstructorRepository {
    async create(createInstructorDTO: CreateInstructorDTO) {
        return await prisma.instructor.create({ data: createInstructorDTO });
    }
    async findAll() {
        return await prisma.instructor.findMany({ where: { isActive: true } })
    }
    async findById(Id: number) {
        return await prisma.instructor.findFirst({ where: { id: Id } })
    }
    async findByEmail(email: string) {
        return await prisma.instructor.findFirst({ where: { email: email } })
    }
    async findPhone(phone: string) {
        return await prisma.instructor.findFirst({ where: { phone: phone } })
    }
    // async update(Id: number, data: UpdateinstructorDTO) {
    //     return await prisma.instructor.update({ where: { id: Id }, data })
    // }
    async delete(Id: number) {
        return await prisma.instructor.delete({ where: { id: Id } })
    }
    async activateAccount(Id: number) {
        return await prisma.instructor.update({ where: { id: Id }, data: { isActive: true } })
    }
    async deactivateAccount(Id: number) {
        return await prisma.instructor.update({ where: { id: Id }, data: { isActive: false } })
    }
}