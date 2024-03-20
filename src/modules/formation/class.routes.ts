import { Router } from "express";
import { ClassRepository } from "./repository/class.repository";
import { ClassService } from "./service/class.service";
import { ClassController } from "./controller/class.controller";
import { createClassRules ,validate} from "./validation/class.validation copy";

const classRepository = new ClassRepository()
const classService = new ClassService(classRepository); 
const classController = new ClassController(classService); 


const classRouter = Router()
/**
 * @swagger
 * /class/create:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassDTO'
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateClassDTO:
 *       type: object
 *       required:
 *         - instructorId
 *         - formationId
 *         - name
 *         - description
 *         - time
 *         - student_quantity
 *       properties:
 *         instructorId:
 *           type: number
 *           example: 1
 *           description: ID of the instructor for the class
 *         formationId:
 *           type: number
 *           example: 1
 *           description: ID of the formation the class belongs to
 *         name:
 *           type: string
 *           example: "Introduction to Web Development"
 *           description: Name of the class
 *         description:
 *           type: string
 *           example: "This class covers the basics of web development."
 *           description: Description of the class
 *         time:
 *           type: string
 *           example: "12:30:00"
 *           description:  time of the class (ISO 8601 format)
 *         student_quantity:
 *           type: number
 *           example: 0
 *           description: Number of students in the class
 */
classRouter.post('/create',createClassRules(),validate, classController.create.bind(classController))
/**
 * @swagger
 * /class/findAll-class:
 *   get:
 *     summary: listar todas class
 *     tags: [Class]
 *     security:
 *       - BearerAuth: []  # Esquema de autenticação JWT
 *     responses:
 *       201:
 *         description: Admin criado com sucesso
 *       400:
 *         description: Requisição inválida
 */
classRouter.get('/findAll-class', classController.findAllClass.bind(classController))
/**
 * @swagger
 * /class/findOneClass/{id}:
 *   get:
 *     summary: Get a single class by ID
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the class to retrieve
 *     responses:
 *       200:
 *         description: class retrieved successfully
 *       404:
 *         description: class not found
 */
classRouter.get('/findOne-formation/:Id', classController.findOneClass.bind(classController))
/**
 * @swagger
 * /class/delete/{id}:
 *   delete:
 *     summary: Delete an formation
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the formation to delete
 *     responses:
 *       200:
 *         description: formation deleted successfully
 *       404:
 *         description: formation not found
 *       500:
 *         description: Internal server error
 */
classRouter.delete('/delete/:Id', classController.deleteClass.bind(classController))
export default classRouter;