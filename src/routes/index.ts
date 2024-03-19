import { Router } from "express";
import adminRouter from "../modules/admin/admin.routes";
import { authenticateToken, checkAdminRole } from "../utils/middlewares/session";
import instructorRouter from "../modules/instructor/instructor.routes";

const routes = Router()

routes.use('/instructor',instructorRouter)
routes.use('/admin',authenticateToken,adminRouter)



export {routes}; 