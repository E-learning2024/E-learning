import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../handler/responseHandler";


import { MessagesResponse } from "../../handler/messagesResponse";

import { LeadsService } from "../service/leads.service";


export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,

  ) {
    
  }

  async create(req: Request, res: Response): Promise<unknown> {
    try {
   
 
const newRequest={
  ...req.body
}

      const student = await this.leadsService.create(newRequest);
      return successResponse(res, student, MessagesResponse.DATA_ENTERED, 201);
    } catch (error) {
      console.log(error);
      return errorResponse(res, MessagesResponse.SERVER_ERROR, 500);
    }
  }
  async findAll(req: Request, res: Response): Promise<unknown> {
    const leads = await this.leadsService.findAll()
    return successResponse(res, leads, MessagesResponse.DATA_ENTERED, 201);

  }
  async findById(req: Request, res: Response): Promise<unknown> {
    const {leadId}= req.params
    const leads = await this.leadsService.findById(parseInt(leadId))
    return successResponse(res, leads, MessagesResponse.DATA_ENTERED, 201);

  }
  async delete(req: Request, res: Response): Promise<unknown> {
    const {leadId}= req.params
    const exist = await this.leadsService.findById(parseInt(leadId))
    if(!exist){
      return errorResponse(res,MessagesResponse.DATA_NOT_FOUND_SUCESS,404)
    }
    const leads = await this.leadsService.delete(parseInt(leadId))
    return successResponse(res, leads, MessagesResponse.LEAD_DELETED, 201);

  }
}
