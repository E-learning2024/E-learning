import { Router } from "express";
import { AvaiationController } from "../controller/avaliation_controllers";
import { AvaliationService } from "../service/avaliation.service";
import { AvaliationRepository } from "../repository/avalation.repository";
import { validate } from "../validation/class.validation";
const avaliationRepository = new AvaliationRepository()
const avaliationService = new  AvaliationService(avaliationRepository)
const avaliationController = new AvaiationController(avaliationService)


const classRouter = Router();
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
 *         - formationId
 *         - name
 *         - description
 *         - time
 *         - student_quantity
 *         - instructors
 *       properties:
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
 *           example: 50
 *           description: Number of students in the class
 *         instructors:
 *           type: array
 *           items:
 *            type: number
 *           example: [{ id: 1}]
 *           description: An array of member IDs
 */
classRouter.post(
  "/create",
  validate,
  avaliationController.create.bind(avaliationController)
);