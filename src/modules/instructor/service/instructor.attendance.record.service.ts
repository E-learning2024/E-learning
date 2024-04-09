import { AttendanceInstructorRepository } from "../repository/instructor.attendance.record.repository";
import {CreateattendanceInstructorDTO} from '../dto/instructor-attendance-record-create'
import { UpdateattendanceInstructorDTO } from "../dto/instructor-attendance-record-update";
export class AttendanceInstructorService {
    constructor(private readonly attendanceInstructorRepository: AttendanceInstructorRepository) {
      console.log('AttendanceInstructorRepository constructor - attendanceInstructorRepository:', this.attendanceInstructorRepository);
    }
    async createAttendance(CreateattendanceInstructorDTO: CreateattendanceInstructorDTO) {
      return await this.attendanceInstructorRepository.createAttendance(CreateattendanceInstructorDTO)
    }
    async updateAttendance(updateattendanceInstructorDTO: UpdateattendanceInstructorDTO,AttendanceId:number) {
      return await this.attendanceInstructorRepository.updateAttendance(updateattendanceInstructorDTO,AttendanceId)
    }
      async findAllAttendance() {
        return await this.attendanceInstructorRepository.findAllAttendance();
      }
      async deleteAttendance(Id:number) {
        return await this.attendanceInstructorRepository.deleteAttendance(Id);
      }
      async findByIdInstructor(Id:number) {
        return await this.attendanceInstructorRepository.findByIdInstructor(Id);
      }
      async findById(Id:number) {
        return await this.attendanceInstructorRepository.findById(Id);
      }
   
  
   
  }
  