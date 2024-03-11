import { Router } from "express";

import funcionarioRouter from "../modules/instructor/instructor.routes";
import adminRouter from "../modules/admin/admin.routes";
import { authenticateToken, checkAdminRole } from "../utils/middlewares/session";

const routes = Router()

routes.use('/funcionario',funcionarioRouter)
routes.use('/admin',authenticateToken,adminRouter)



export {routes}; 