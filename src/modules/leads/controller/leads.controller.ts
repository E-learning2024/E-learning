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

}
