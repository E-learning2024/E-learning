import prisma from "../../../config/lib/prisma";
import { CreatespecialityInstructorDTO } from "../dto/instructor-specialty-create";
import {UpatespecialityInstructorDTO} from '../dto/instructor-specialty-update'
export class SpecialtyInstructorRepository {
    async createSpeciality(createspecialityInstructorDTO: CreatespecialityInstructorDTO) {
        return await prisma.specialty.create({ data: createspecialityInstructorDTO });
    }
    async findAllSpecialityIdInstructor(Id: number) {
        return await prisma.specialty.findFirst({ where: { instructorId: Id } })
    }
    async deleteSpeciality(Id: number) {
        return await prisma.specialty.delete({ where: { id: Id } })
    }
    async updateSpeciality(Id: number,data:UpatespecialityInstructorDTO) {
        return await prisma.specialty.update({ where: { id: Id }, data })
    }

}