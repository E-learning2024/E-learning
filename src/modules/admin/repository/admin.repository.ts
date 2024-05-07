import { prisma } from "../../../config/lib/prisma";
import { CreateAdministratorDTO } from "../dto/create-admin.dto";
import { CreateTeamAdministratorDTO } from "../dto/create-team-admin.dto";
import { UpdateAdministratorDTO } from "../dto/update-admin.dto";
import { UpdateTeamAdministratorDTO } from "../dto/update-team-admin.dto";
export class AdminRepository {
  async create(createAdministratorDTO: CreateAdministratorDTO) {
    return await prisma.administrator.create({ data: createAdministratorDTO });
  }
  async findAll() {
    const count = await prisma.administrator.count();
 const admin=   await prisma.administrator.findMany({  
      select: {
        id: true,
        name: true,
        email: true,
        nif: true,
        phone: true,
        password: false,
        accessLevelId: true,
        isActive: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        accessLevel: true,
        activityHistoryAdmin: true,
        teamLeader: true,
        teamMembers: true,
        _count: true
       }})
    return{
      count,
      admin
    };
  }
  async findById(Id: number) {
    return await prisma.administrator.findFirst({ where: { id: Id }, select: {
      id: true,
      name: true,
      email: true,
      nif: true,
      phone: true,
      password: false,
      accessLevelId: true,
      isActive: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      accessLevel: true,
      activityHistoryAdmin: true,
      teamLeader: true,
      teamMembers: true,
      _count: true
  }});
  }
  async findByNif(nif: string) {
    return await prisma.administrator.findFirst({ where: { nif: nif }, select: {
      id: true,
      name: true,
      email: true,
      nif: true,
      phone: true,
      password: false,
      accessLevelId: true,
      isActive: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      accessLevel: true,
      activityHistoryAdmin: true,
      teamLeader: true,
      teamMembers: true,
      _count: true
  }});
  }
  async findByEmail(email: string) {
    return await prisma.administrator.findFirst({ where: { email: email }, select: {
      id: true,
      name: true,
      email: true,
      nif: true,
      phone: true,
      password: true,
      accessLevelId: true,
      isActive: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      accessLevel: true,
      activityHistoryAdmin: true,
      teamLeader: true,
      teamMembers: true,
      _count: true
  }});
  }
  async findPhone(phone: string) {
    return await prisma.administrator.findFirst({ where: { phone: phone }, select: {
      id: true,
      name: true,
      email: true,
      nif: true,
      phone: true,
      password: false,
      accessLevelId: true,
      isActive: true,
      avatarUrl: true,
      createdAt: true,
      updatedAt: true,
      accessLevel: true,
      activityHistoryAdmin: true,
      teamLeader: true,
      teamMembers: true,
      _count: true
  }});
  }
  async update(Id: number, data: UpdateAdministratorDTO) {
    return await prisma.administrator.update({ where: { id: Id }, data });
  }
  async delete(Id: number) {
    return await prisma.administrator.delete({ where: { id: Id } });
  }
  async activateAccount(Id: number) {
    return await prisma.administrator.update({
      where: { id: Id },
      data: { isActive: true },
    });
  }
  async deactivateAccount(Id: number) {
    return await prisma.administrator.update({
      where: { id: Id },
      data: { isActive: false },
    });
  }

  async createTeam(data: CreateTeamAdministratorDTO) {
    return await prisma.teamAdmin.create({
      data: {
        name: data.name,
        description: data.description,
        leaderId: data.leaderId,
        members: {
          connect: data.members, // IDs dos membros a serem conectados
        },
      },
      include: { members: true },
    });
  }
  async findAllTeam() {
    return await prisma.teamAdmin.findMany({
      include: { members: true },
    });
  }
  async findOneTeam(Id: number) {
    return await prisma.teamAdmin.findUnique({
      where: {
        id: Id,
      },
      include: { members: true },
    });
  }
  async updateTeam(data: UpdateTeamAdministratorDTO, Id: number) {
    return await prisma.teamAdmin.update({
      where: {
        id: Id,
      },
      data: {
        name: data.name,
        description: data.description,
        leaderId: data.leaderId,
        members: {
          connect: data.members, // IDs dos membros a serem conectados
        },
      },
      include: { members: true },
    });
  }
  async deleteTeam(Id: number) {
    return await prisma.teamAdmin.delete({
      where: {
        id: Id,
      },
      include: { members: true },
    });
  }
}
