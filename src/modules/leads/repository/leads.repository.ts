import { promises } from "dns";
import {prisma} from "../../../config/lib/prisma";
import { CreateLeadDTO } from "../dto/create-leads.dto";

export class LeadsRepository {
    async create(createLeadDTO: CreateLeadDTO) {
        return await prisma.leads.create({ data: createLeadDTO });
    }
    async findAll():Promise<any> {
        return await prisma.leads.findMany({ });
    }
    async findById(id:number):Promise<any> {
        return await prisma.leads.findFirst({where:{
            id:id
        } });
    }
    async delete(id:number):Promise<any> {
        return await prisma.leads.delete({where:{
            id:id
        } });
    }
}