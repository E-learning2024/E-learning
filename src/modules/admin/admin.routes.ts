import { Router } from "express";
import  {AdminController}  from './controller/admin.controller'; 
import { AdmimService } from './service/admin.service';
import { createAdminValidationRules, validate } from "./validation/admin.validation";
import { AdmimRepository } from "./repository/admin.repository";

const admimRepository = new AdmimRepository()
const adminService = new AdmimService(admimRepository); 
const adminController = new AdminController(adminService); 


const adminRouter = Router()
adminRouter.post('/createAdmin',createAdminValidationRules(),validate, adminController.createAdmin)
export default adminRouter;