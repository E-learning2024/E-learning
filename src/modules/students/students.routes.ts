import { Router } from "express";
import { AuthenticationService } from "../../utils/authentication/authentication";
import { StudentRepository } from "./repository/students.repository";
import { StudentService } from "./service/student.service";
import { StudentController } from "./controller/students.controller";
import { signStudentValidationRules, validate } from "./validation/student.validation";
import { EnrollmentRepository } from "./repository/enrollment.repository";
import { ClassService } from "../formation/service/class.service";
import { ClassRepository } from "../formation/repository/class.repository";

const studentRepository = new StudentRepository()
const enrollmentRepository = new EnrollmentRepository()
const studentService = new StudentService(studentRepository,enrollmentRepository); 
const authenticationService = new AuthenticationService(); 
const classRepository = new ClassRepository()
const classService = new ClassService(classRepository); 
const studentController = new StudentController(studentService,authenticationService,classService); 


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

studentRouter.post('/create', studentController.createStudent.bind(studentController))
/**
 * @swagger
 * /student/edit/{studentId}:
 *   put:
 *     summary: Edit student information
 *     tags: [Student]
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: ID of the student to edit
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditStudentDTO'
 *     responses:
 *       200:
 *         description: Student information updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EditStudentDTO:
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
 *         - avatarUrl
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
studentRouter.put('/edit/:Id', studentController.updatestudent.bind(studentController))
/**
 * @swagger
 * /student/findAllStudent:
 *   get:
 *     summary: listar todos os Estudantes
 *     tags: [Student]
 *     security:
 *       - BearerAuth: []  # Esquema de autenticação JWT
 *     responses:
 *       201:
 *         description: student encontrados
 *       400:
 *         description: Requisição inválida
 */
 studentRouter.get('/findAllStudent', studentController.findAllStudent.bind(studentController))
/**
 * @swagger
 * /student/findOneStudent/{id}:
 *   get:
 *     summary: Get a single admin by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the admin to retrieve
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       404:
 *         description: Student not found
 */
studentRouter.get('/findOneStudent/:Id', studentController.findOneStudent.bind(studentController))
/**
 * @swagger
 * /student/sign:
 *   post:
 *     summary: Realizar login de estudante
 *     tags: [Student]
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
studentRouter.post('/sign',signStudentValidationRules(),validate, studentController.sign.bind(studentController))
/**
 * @swagger
 * /student/delete/{id}:
 *   delete:
 *     summary: Delete an Admin
 *     tags: [Student]
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

studentRouter.delete('/delete/:id' ,studentController.deleteStudent.bind(studentController))


/**
 * @swagger
 * /student/enrollment/create:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Student-Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEnrollmentDTO'
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEnrollmentDTO:
 *       type: object
 *       required:
 *         - studentId
 *         - classId
 *         - status
 *       properties:
 *         studentId:
 *           type: number
 *           example: 1
 *           description: ID of the student
 *         classId:
 *           type: number
 *           example: 1
 *           description: ID of the class
 *         status:
 *           type: string
 *           enum:
 *             - PENDENTE
 *             - CONFIRMADO
 *           example: "PENDENTE"
 *           description: Status of the enrollment
 */
studentRouter.post('/enrollment/create', studentController.createnrollment.bind(studentController))
export default studentRouter;