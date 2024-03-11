import { Router } from "express";
import  {AdminController}  from './controller/admin.controller'; 
import { AdminService } from './service/admin.service';
import { createAdminValidationRules, validate } from "./validation/admin.validation";
import { AdminRepository } from "./repository/admin.repository";
import { AuthenticationService } from "../../utils/authentication/authentication";

const admimRepository = new AdminRepository()
const adminService = new AdminService(admimRepository); 
const authenticationService = new AuthenticationService(); 
const adminController = new AdminController(adminService,authenticationService); 


const adminRouter = Router()
/**
 * @swagger
 * /admin/createAdmin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Gelson Mesquita"
 *               email:
 *                 type: string
 *                 example: "email@example.com"
 *               nif:
 *                 type: string
 *                 example: "123456789"
 *               phone:
 *                 type: string
 *                 example: "(+244) 930333042"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               accessLevelId:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               avatarUrl:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request
 */
adminRouter.post('/createAdmin',createAdminValidationRules(),validate, adminController.createAdmin.bind(adminController))
/**
 * @swagger
 * /admin/findAlladmin:
 *   get:
 *     summary: listar todos os administradores
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []  # Esquema de autenticação JWT
 *     responses:
 *       201:
 *         description: Admin criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
adminRouter.get('/findAlladmin', adminController.findAlladmin.bind(adminController))
/**
 * @swagger
 * /admin/findOneadmin/{id}:
 *   get:
 *     summary: Get a single admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the admin to retrieve
 *     responses:
 *       200:
 *         description: Admin retrieved successfully
 *       404:
 *         description: Admin not found
 */
adminRouter.get('/findOneadmin/:Id', adminController.findOneadmin.bind(adminController))
/**
 * @swagger
 * /admin/sign:
 *   post:
 *     summary: Realizar login de administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */

adminRouter.post('/sign', adminController.sign.bind(adminController))
export default adminRouter;