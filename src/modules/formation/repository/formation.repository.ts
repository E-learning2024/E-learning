import { prisma } from "../../../config/lib/prisma";
import { CreateFormationDTO } from "../dto/create-formation.dto";
import { UpdateFormationDTO } from "../dto/update-formation.dto";
export class FormationRepository {
  async create(createFormationDTO: CreateFormationDTO) {
    return await prisma.formations.create({ data: createFormationDTO });
  }
  async findAll() {
    const _count = await prisma.formations.count();
    const forma = await prisma.formations.findMany({
      where: { isActive: true },
    });
    return {
        _count,
      formations: forma,
    };
  }
  async findById(Id: number) {
    return await prisma.formations.findFirst({
      where: { id: Id, isActive: true },
      include: {
        class: true,
      },
    });
  }

  async update(Id: number, data: UpdateFormationDTO) {
    return await prisma.formations.update({ where: { id: Id }, data });
  }
  async delete(Id: number) {
    return await prisma.formations.delete({ where: { id: Id } });
  }
  async activateFormation(Id: number) {
    return await prisma.formations.update({
      where: { id: Id },
      data: { isActive: true },
    });
  }
  async deactivateFormation(Id: number) {
    return await prisma.formations.update({
      where: { id: Id },
      data: { isActive: false },
    });
  }
}
