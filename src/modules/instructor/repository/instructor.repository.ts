import { prisma } from "../../../config/lib/prisma";
import { CreateInstructorDTO } from "../dto/instructor-create";
import { UpdateInstructorDTO } from "../dto/instructor-update";
export class InstructorRepository {
  async create(createInstructorDTO: CreateInstructorDTO) {
    return await prisma.instructor.create({ data: createInstructorDTO });
  }
  async findAll() {
    const _count = await prisma.instructor.count();
    const instructores = await prisma.instructor.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        nif: true,
        phone: true,
        bio: true,
        password: false,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        specialty: true,

        presence: true,
        _count: true,
      },
    });
    return {
      _count,
      instructores,
    };
  }
  async findById(Id: number) {
    return await prisma.instructor.findUnique({
      where: { id: Id },
      select: {
        id: true,
        name: true,
        email: true,
        nif: true,
        phone: true,
        bio: true,
        password: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        specialty: true,

        presence: true,
        _count: true,
      },
    });
  }
  async findByNif(nif: string) {
    return await prisma.instructor.findUnique({
      where: { nif: nif },
      select: {
        id: true,
        name: true,
        email: true,
        nif: true,
        phone: true,
        bio: true,
        password: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        specialty: true,
        presence: true,
        _count: true,
      },
    });
  }
  async findByEmail(email: string) {
    return await prisma.instructor.findFirst({ where: { email: email } });
  }
  async findPhone(phone: string) {
    return await prisma.instructor.findFirst({ where: { phone: phone } });
  }
  async update(Id: number, data: UpdateInstructorDTO) {
    return await prisma.instructor.update({
      where: { id: Id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        nif: true,
        phone: true,
        bio: true,
        password: false,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        specialty: true,
        presence: true,
        _count: true,
      },
    });
  }
  async delete(Id: number) {
    return await prisma.instructor.delete({ where: { id: Id } });
  }
  async activateAccount(Id: number) {
    return await prisma.instructor.update({
      where: { id: Id },
      data: { isActive: true },
    });
  }
  async deactivateAccount(Id: number) {
    return await prisma.instructor.update({
      where: { id: Id },
      data: { isActive: false },
    });
  }
}
