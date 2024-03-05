import prisma from "../../config/lib/prisma";
import { CreateAdministratorDTO } from "../admin/dto/create-admin.dto";

export class AdmimService {
    create(createInspectionDto: CreateAdministratorDTO) {
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
  
    findAll() {
    //   return prisma.regularInspection.findMany({
    //     include: {
    //       user: true,
    //       vehicleInspection: true,
    //       anexos: true,
    //     },
    //   });
    }
  
    findOne(id: number) {
      return `This action returns a #${id} inspection`;
    }
  
    update(id: number, updateInspectionDto: any) {
      return `This action updates a #${id} inspection`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} inspection`;
    }
  }
  