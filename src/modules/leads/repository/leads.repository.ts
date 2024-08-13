import {prisma} from "../../../config/lib/prisma";
import { CreateLeadDTO } from "../dto/create-leads.dto";

export class LeadsRepository {
    async create(createLeadDTO: CreateLeadDTO) {
        return await prisma.leads.create({ data: createLeadDTO });
    }
}