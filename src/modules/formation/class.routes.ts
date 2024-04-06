import { Router } from "express";
import { ClassRepository } from "./repository/class.repository";
import { ClassService } from "./service/class.service";
import { ClassController } from "./controller/class.controller";
import { createClassRules ,updateClassRules,validate} from "./validation/class.validation";
import { FormationRepository } from "./repository/formation.repository";
import { FormationService } from "./service/formation.service";
import { InstructorRepository } from "../instructor/repository/instructor.repository";
import { InstructorService } from "../instructor/service/instructor.service";
import { Materialervice } from "./service/material.service";
import { MaterialRepository } from "./repository/material.repository";
import multer from 'multer';
import configureMulter from "../../utils/middlewares/fileUpload";
import { createMaterialRules } from "./validation/material.validation";
const upload = multer(configureMulter());

const classRepository = new ClassRepository()
const classService = new ClassService(classRepository); 
const formationRepository = new FormationRepository()
const formationService = new FormationService(formationRepository); 
const instructorRepository = new InstructorRepository()
const instructorService = new InstructorService(instructorRepository); 
const materialRepository = new MaterialRepository()
const materialervice = new Materialervice(materialRepository)
const classController = new ClassController(classService,formationService,instructorService,materialervice); 


const classRouter = Router()
/**
 * @swagger
 * /class/create:
 *   post:
 *     summary: Create a new class
 *     tags: [CLASS]
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
 *     tags: [CLASS]
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
 * /class/findOne-class/{id}:
 *   get:
 *     summary: Get a single class by ID
 *     tags: [CLASS]
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
classRouter.get('/findOne-class/:Id', classController.findOneClass.bind(classController))
/**
 * @swagger
 * /class/delete/{id}:
 *   delete:
 *     summary: Delete an formation
 *     tags: [CLASS]
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
/**
 * @swagger
 * /class/editClass/{id}:
 *   patch:
 *     summary: Edit an existing class
 *     tags: [CLASS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the class to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditClassDTO'
 *     responses:
 *       200:
 *         description: Class edited successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EditClassDTO:
 *       type: object
 *       required:
 *         - instructorId
 *         - formationId
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
 *           description: Time of the class (ISO 8601 format)
 *         student_quantity:
 *           type: number
 *           example: 0
 *           description: Number of students in the class
 */

classRouter.patch('/editClass/:Id', updateClassRules(),validate,classController.update.bind(classController))
/**
 * @swagger
 * /class/material/create:
 *   post:
 *     summary: Create a new material
 *     tags: [CLASS-MATERIAL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMaterialDTO'
 *     responses:
 *       201:
 *         description: Material created successfully
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateMaterialDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - fileUrl
 *         - classId
 *       properties:
 *         title:
 *           type: string
 *           example: "Material Title"
 *           description: Title of the material
 *         description:
 *           type: string
 *           example: "This material covers important concepts."
 *           description: Description of the material
 *         fileUrl:
 *           type: string
 *           example: "https://example.com/material.pdf"
 *           description: URL of the material file
 *         classId:
 *           type: number
 *           example: 1
 *           description: ID of the class the material belongs to
 */

classRouter.post('/material/create',upload.single('file'),createMaterialRules(),validate,classController.createMaterial.bind(classController))

/**
 * @swagger
 * /class/material/findByIdClass/{classId}:
 *   get:
 *     summary: Get a single class by ID
 *     tags: [CLASS-MATERIAL]
 *     parameters:
 *       - in: path
 *         name: classId
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
classRouter.get('/material/findByIdClass/:classId', classController.findByIdClass.bind(classController))

/**
 * @swagger
 * /class/material/findById/{Id}:
 *   get:
 *     summary: Get a single class by ID
 *     tags: [CLASS-MATERIAL]
 *     parameters:
 *       - in: path
 *         name: Id
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
classRouter.get('/material/findById/:Id', classController.findByIdMaterial.bind(classController))
export default classRouter;