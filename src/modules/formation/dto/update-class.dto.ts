
  export class UpdateClassDTO {
    instructorId!: number;
    formationId!: number;
    name!: string;
    description!: string;
    time!: string;
    instructors?: { id: number }[];
    student_quantity!: number;
  }

