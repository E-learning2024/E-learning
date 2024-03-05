import { Router } from "express";
import  * as adminController from "./controller/admin.controller";

const areasRouter = Router()
areasRouter.get('/createAdmin',adminController.createAdmin)
export default areasRouter;