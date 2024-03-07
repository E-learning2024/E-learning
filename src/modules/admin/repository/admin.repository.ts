import prisma from "../../../config/lib/prisma";
import { CreateAdministratorDTO } from "../dto/create-admin.dto";
export class AdmimRepository {
async create(createAdministratorDTO: CreateAdministratorDTO) {
     //   return prisma.regularInspection.create({
    //     data: {
    //       userId: createInspectionDto.userId,
    //       vehicleInspection: {
    //         createMany: {
    //           data: createInspectionDto.vehicleInspectionDto,
    //         },
    //       },
    //       anexos: {
    //         createMany: {
    //           data: createInspectionDto.createAnexosDto,
    //         },
    //       },
    //     },
    //     include: {
    //       vehicleInspection: true,
    //       anexos: true,
    //     },
    //   });
}
}