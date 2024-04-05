enum Status {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
}
export class CreateEnrollmentDTO {
    studentId!:number;
    classId!:number;
    status?:Status

  }
