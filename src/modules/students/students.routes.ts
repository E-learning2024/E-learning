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
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentDTO'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateStudentDTO:
 *       type: object
 *       required:
 *         - Studentname
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - isActive
 *         - phone
 *         - nif
 *         - dateOfBirth
 *       properties:
 *         Studentname:
 *           type: string
 *           example: "JohnDoe"
 *           description: Username of the student
 *         email:
 *           type: string
 *           example: "email@example.com"
 *           description: Email of the student
 *         password:
 *           type: string
 *           example: "password123"
 *           description: Password of the student
 *         firstName:
 *           type: string
 *           example: "John"
 *           description: First name of the student
 *         lastName:
 *           type: string
 *           example: "Doe"
 *           description: Last name of the student
 *         isActive:
 *           type: boolean
 *           example: true
 *           description: Whether the student is active
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 *           description: Phone number of the student
 *         nif:
 *           type: string
 *           example: "123456789"
 *           description: NIF of the student
 *         avatarUrl:
 *           type: string
 *           example: "https://example.com/avatar.jpg"
 *           description: URL of the student's avatar
 *         dateOfBirth:
 *           type: string
 *           example: "2000-01-01"
 *           description: Date of birth of the student (YYYY-MM-DD)
 */

studentRouter.post('/create', studentController.createAdmin.bind(studentController))
// /**
//  * @swagger
//  * /admin/findAlladmin:
//  *   get:
//  *     summary: listar todos os administradores
//  *     tags: [Admin]
//  *     security:
//  *       - BearerAuth: []  # Esquema de autenticação JWT
//  *     responses:
//  *       201:
//  *         description: Admin criado com sucesso
//  *       400:
//  *         description: Requisição inválida
//  */
// studentRouter.get('/findAlladmin', studentController.findAlladmin.bind(studentController))
// /**
//  * @swagger
//  * /admin/findOneadmin/{id}:
//  *   get:
//  *     summary: Get a single admin by ID
//  *     tags: [Admin]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the admin to retrieve
//  *     responses:
//  *       200:
//  *         description: Admin retrieved successfully
//  *       404:
//  *         description: Admin not found
//  */
// studentRouter.get('/findOneadmin/:Id', studentController.findOneadmin.bind(studentController))
// /**
//  * @swagger
//  * /admin/sign:
//  *   post:
//  *     summary: Realizar login de administrador
//  *     tags: [Admin]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Login bem-sucedido
//  *       401:
//  *         description: Credenciais inválidas
//  */
// studentRouter.post('/sign', studentController.sign.bind(studentController))
// /**
//  * @swagger
//  * /admin/delete/{id}:
//  *   delete:
//  *     summary: Delete an Admin
//  *     tags: [Admin]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID of the Admin to delete
//  *     responses:
//  *       200:
//  *         description: Admin deleted successfully
//  *       404:
//  *         description: Admin not found
//  *       500:
//  *         description: Internal server error
//  */

// studentRouter.delete('/delete/:id' ,studentController.deleteAdmin.bind(studentController))
export default studentRouter;