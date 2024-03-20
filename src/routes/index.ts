import { Router } from "express";
import adminRouter from "../modules/admin/admin.routes";
import { authenticateToken, checkAdminRole } from "../utils/middlewares/session";
import instructorRouter from "../modules/instructor/instructor.routes";
import classRouter from "../modules/formation/class.routes";
import formationRouter from "../modules/formation/formation.routes";

const routes = Router()

routes.use('/instructor',instructorRouter)
routes.use('/class',classRouter)
routes.use('/admin',adminRouter)
routes.use('/formation',formationRouter)



export {routes}; 