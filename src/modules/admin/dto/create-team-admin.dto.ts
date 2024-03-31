export class CreateTeamAdministratorDTO {
  name!: string;
  description!: string;
  leaderId!: number;
  members?: { id: number }[];
}