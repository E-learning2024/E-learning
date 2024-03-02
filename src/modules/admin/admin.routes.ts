import { Router } from "express";
import  * as adminController from "./controller/admin.controller";

const areasRouter = Router()
areasRouter.get('/PainelControlArea',adminController.PainelControlArea)
export default areasRouter;