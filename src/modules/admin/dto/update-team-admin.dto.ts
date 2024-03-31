export class UpdateTeamAdministratorDTO {
  name!: string;
  description!: string;
  leaderId!: number;
  members?: { id: number }[];
}