import { Router } from "express";
import { AuthenticationService } from "../../utils/authentication/authentication";
import { StudentRepository } from "./repository/students.repository";
import { StudentService } from "./service/student.service";
import { StudentController } from "./controller/students.controller";

const studentRepository = new StudentRepository()
const studentService = new StudentService(studentRepository); 
const authenticationService = new AuthenticationService(); 
const studentController = new StudentController(studentService,authenticationService); 


const studentRouter = Router()
/**
 * @swagger
 * /student/create:
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
studentRouter.post('/create', studentController.createAdmin.bind(studentController))
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
studentRouter.get('/findAlladmin', studentController.findAlladmin.bind(studentController))
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
studentRouter.get('/findOneadmin/:Id', studentController.findOneadmin.bind(studentController))
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
studentRouter.post('/sign', studentController.sign.bind(studentController))
/**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     summary: Delete an Admin
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Admin to delete
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

studentRouter.delete('/delete/:id' ,studentController.deleteAdmin.bind(studentController))
export default studentRouter;