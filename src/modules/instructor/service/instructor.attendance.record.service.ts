import { AttendanceInstructorRepository } from "../repository/instructor.attendance.record.repository";
import {CreateattendanceInstructorDTO} from '../dto/instructor-attendance-record-create'
export class AttendanceInstructorService {
    constructor(private readonly attendanceInstructorRepository: AttendanceInstructorRepository) {
      console.log('AttendanceInstructorRepository constructor - attendanceInstructorRepository:', this.attendanceInstructorRepository);
    }
    async createAttendance(CreateattendanceInstructorDTO: CreateattendanceInstructorDTO) {
      return await this.attendanceInstructorRepository.createAttendance(CreateattendanceInstructorDTO)
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
   
  
   
  }
  