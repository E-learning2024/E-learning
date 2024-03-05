
export class ContactDTO {
    email?: string;
    phone?: string;
    address?: string;
  }[]
  export class CreateAdministratorDTO {
    name?: string;
    email?: string;
    password?: string;
    accessLevelId?: number;
    isActive?: boolean;
    contact?: ContactDTO[];

  }