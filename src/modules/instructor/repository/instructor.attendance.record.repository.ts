import {prisma} from "../../../config/lib/prisma";
import {CreateattendanceInstructorDTO} from '../dto/instructor-attendance-record-create'
import { UpdateattendanceInstructorDTO } from "../dto/instructor-attendance-record-update";
export class AttendanceInstructorRepository {
    async createAttendance(CreateattendanceInstructorDTO: CreateattendanceInstructorDTO) {
        return await prisma.presence.create({ data: CreateattendanceInstructorDTO });
    }
    async updateAttendance(updateattendanceInstructorDTO: UpdateattendanceInstructorDTO,AttendanceId:number) {
        return await prisma.presence.update({ data: updateattendanceInstructorDTO,where:{id:AttendanceId} });
    }
    async findAllAttendance() {
        return await prisma.presence.findMany({})
    }
    async findByIdInstructor(Id: number) {
        return await prisma.presence.findMany({ where: { instructorId: Id } })
    }
    async findById(Id: number) {
        return await prisma.presence.findMany({ where: { id: Id } })
    }
    async deleteAttendance(Id: number) {
        return await prisma.presence.delete({ where: { id: Id } })
    }

}