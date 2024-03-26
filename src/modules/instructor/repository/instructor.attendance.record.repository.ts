import prisma from "../../../config/lib/prisma";
import {CreateattendanceInstructorDTO} from '../dto/instructor-attendance-record-create'
export class AttendanceInstructorRepository {
    async createAttendance(CreateattendanceInstructorDTO: CreateattendanceInstructorDTO) {
        return await prisma.presence.create({ data: CreateattendanceInstructorDTO });
    }
    async findAllAttendance() {
        return await prisma.presence.findMany({})
    }
    async findByIdInstructor(Id: number) {
        return await prisma.presence.findFirst({ where: { instructorId: Id } })
    }
    async deleteAttendance(Id: number) {
        return await prisma.presence.delete({ where: { id: Id } })
    }

}