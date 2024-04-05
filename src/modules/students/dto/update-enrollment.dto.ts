enum Status {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
}
export class UpdateEnrollmentDTO {
  studentId!: number;
  classId!: number;
  status?: Status;
}
