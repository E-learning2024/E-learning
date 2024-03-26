import { Router } from "express";
import  {InstructorController}  from './controller/instructor.controller'; 
import { AuthenticationService } from "../../utils/authentication/authentication";
import { InstructorRepository } from "./repository/instructor.repository";
import { InstructorService } from "./service/instructor.service";
import { createAttendanceRecordValidationRules, createInstructorValidationRules, signInstructorValidationRules, validate } from "./validation/instructor.validation";
import { AttendanceInstructorService } from "./service/instructor.attendance.record.service";
import { AttendanceInstructorRepository } from "./repository/instructor.attendance.record.repository";
import { SpecialtyInstructorRepository } from "./repository/instructor.speciality.repository";
import { SpecialityInstructorService } from "./service/instructor.speciality.service";

const instructorRepository = new InstructorRepository()
const instructorService = new InstructorService(instructorRepository); 
const authenticationService = new AuthenticationService(); 
const attendanceInstructorRepository = new AttendanceInstructorRepository()
const specialtyInstructorRepository = new SpecialtyInstructorRepository()
const attendanceInstructorService = new AttendanceInstructorService(attendanceInstructorRepository)
const specialityInstructorService = new SpecialityInstructorService(specialtyInstructorRepository)
const instructorController = new InstructorController(instructorService,authenticationService,attendanceInstructorService,specialityInstructorService); 


const instructorRouter = Router()
/**
* @swagger
* /instructor/createInstructor:
*   post:
*     summary: Create a new instructor
*     tags: [Instructor]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CreateInstructorDTO'
*     responses:
*       201:
*         description: Instructor created successfully
*       400:
*         description: Bad request
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateInstructorDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - nif
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the instructor
 *           example: "Gelson Mesquita"
 *         email:
 *           type: string
 *           description: Email of the instructor
 *           example: "email@example.com"
 *         nif:
 *           type: string
 *           description: NIF of the instructor
 *           example: "123456789"
 *         phone:
 *           type: string
 *           description: Phone number of the instructor
 *           example: "(+244) 930333042"
 *         bio:
 *           type: string
 *           description: Bio of the instructor
 *           example: "Experienced instructor with a passion for teaching."
 *         password:
 *           type: string
 *           description: Password of the instructor
 *           example: "senha123"
 *         isActive:
 *           type: boolean
 *           description: Whether the instructor is active
 *           example: true
 */
instructorRouter.post('/createInstructor',createInstructorValidationRules(),validate ,instructorController.create.bind(instructorController))
/**
 * @swagger
 * /instructor/findAllinstructor:
 *   get:
 *     summary: listar todos os Instrutores
 *     tags: [Instructor]
 *     security:
 *       - BearerAuth: []  # Esquema de autenticação JWT
 *     responses:
 *       200:
 *         description: Admin criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
instructorRouter.get('/findAllinstructor' ,instructorController.findAllinstructor.bind(instructorController))
/**
 * @swagger
 * /instructor/sign:
 *   post:
 *     summary: Realizar login de instructor
 *     tags: [Instructor]
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
instructorRouter.post('/sign' ,signInstructorValidationRules(),validate,instructorController.sign.bind(instructorController))
/**
 * @swagger
 * /instructor/delete/{id}:
 *   delete:
 *     summary: Delete an instructor
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the instructor to delete
 *     responses:
 *       200:
 *         description: Instructor deleted successfully
 *       404:
 *         description: Instructor not found
 *       500:
 *         description: Internal server error
 */

instructorRouter.delete('/delete/:id' ,instructorController.deleteInstructor.bind(instructorController))
/**
 * @swagger
 * /instructor/findOneInstr/{id}:
 *   get:
 *     summary: Get a single Instructor by ID
 *     tags: [Instructor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Instructor to retrieve
 *     responses:
 *       200:
 *         description: Instructor retrieved successfully
 *       404:
 *         description: Instructor not found
 */
instructorRouter.get('/findOneInstr/:Id' ,instructorController.findOneInstr.bind(instructorController))
/**
* @swagger
* /instructor/updateInstr/{id}:
*   put:
*     summary: Update an instructor
*     tags: [Instructor]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the instructor to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UpdateInstructorDTO'
*     responses:
*       200:
*         description: Instructor updated successfully
*       400:
*         description: Bad request
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateInstructorDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the instructor
 *           example: "Gelson Mesquita"
 *         email:
 *           type: string
 *           description: Email of the instructor
 *           example: "email@example.com"
 *         nif:
 *           type: string
 *           description: NIF of the instructor
 *           example: "123456789"
 *         phone:
 *           type: string
 *           description: Phone number of the instructor
 *           example: "(+244) 930333042"
 *         bio:
 *           type: string
 *           description: Bio of the instructor
 *           example: "Experienced instructor with a passion for teaching."
 *         password:
 *           type: string
 *           description: Password of the instructor
 *           example: "senha123"
 *         isActive:
 *           type: boolean
 *           description: Whether the instructor is active
 *           example: true
 */
instructorRouter.put('/updateInstr/:Id' ,instructorController.updateInstr.bind(instructorController))
/**
 * @swagger
 * /instructor/createAttendanceRecord:
 *   post:
 *     summary: Create a new instructor attendance
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAttendanceInstructorDTO'
 *     responses:
 *       201:
 *         description: Instructor attendance created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAttendanceInstructorDTO:
 *       type: object
 *       properties:
 *         instructorId:
 *           type: number
 *           description: ID of the instructor
 *           example: 1
 *   
 *         present:
 *           type: boolean
 *           description: Whether the instructor is present
 *           example: true
 *       required:
 *         - instructorId
 *         - date
 *         - present
 */

instructorRouter.post('/createAttendanceRecord',createAttendanceRecordValidationRules(),validate ,instructorController.createAttendanceRecord.bind(instructorController))
export default instructorRouter;