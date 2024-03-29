export class CreateAdministratorDTO {
  name     !: string
  description !: string
  leaderId !: number
  members !: [number]
}