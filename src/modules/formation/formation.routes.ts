import { Router } from "express";
import { FormationRepository } from "./repository/formation.repository";
import { FormationService } from "./service/formation.service";
import { FormationController } from "./controller/formation.controller";
import { createFormationRules, updateFormationRules, validate } from "./validation/formation.validation";

const formationRepository = new FormationRepository()
const formationService = new FormationService(formationRepository); 
const formationController = new FormationController(formationService); 


const formationRouter = Router()
/**
 * @swagger
 * /formation/create:
 *   post:
 *     summary: Create a new formation
 *     tags: [Formation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFormationDTO'
 *     responses:
 *       201:
 *         description: Formation created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateFormationDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - isActive
 *       properties:
 *         title:
 *           type: string
 *           example: "Web Development Bootcamp"
 *         description:
 *           type: string
 *           example: "A comprehensive bootcamp covering all aspects of web development."
 *         startDate:
 *           type: string
 *           example: "2024-09-01"
 *           description: Date when the formation starts (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           example: "2024-09-01"
 *           description: Date when the formation ends (YYYY-MM-DD)
 *         isActive:
 *           type: boolean
 *           example: true
 */

formationRouter.post('/create',createFormationRules(),validate, formationController.create.bind(formationController))
/**
 * @swagger
 * /formation/edit/{id}:
 *   put:
 *     summary: Edit a formation
 *     tags: [Formation]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the formation to edit
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditFormationDTO'
 *     responses:
 *       200:
 *         description: Formation edited successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Formation not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EditFormationDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - isActive
 *       properties:
 *         title:
 *           type: string
 *           example: "Web Development Bootcamp"
 *         description:
 *           type: string
 *           example: "A comprehensive bootcamp covering all aspects of web development."
 *         startDate:
 *           type: string
 *           example: "2024-09-01"
 *           description: Date when the formation starts (YYYY-MM-DD)
 *         endDate:
 *           type: string
 *           example: "2024-09-01"
 *           description: Date when the formation ends (YYYY-MM-DD)
 *         isActive:
 *           type: boolean
 *           example: true
 */
  
formationRouter.put('/edit/:Id',updateFormationRules(),validate, formationController.updateFormation.bind(formationController))
/**
 * @swagger
 * /formation/findAll-formation:
 *   get:
 *     summary: listar todas as formação
 *     tags: [Formation]
 *     security:
 *       - BearerAuth: []  # Esquema de autenticação JWT
 *     responses:
 *       201:
 *         description: formação localizado 
 *       400:
 *         description: Requisição inválida
 */
formationRouter.get('/findAll-formation', formationController.findAllFormation.bind(formationController))
/**
 * @swagger
 * /formation/findOne-formation/{id}:
 *   get:
 *     summary: Get a single formation by ID
 *     tags: [Formation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the formation to retrieve
 *     responses:
 *       200:
 *         description: Formation retrieved successfully
 *       404:
 *         description: Formation not found
 */
formationRouter.get('/findOne-formation/:Id', formationController.findOneFormation.bind(formationController))
/**
 * @swagger
 * /formation/delete/{id}:
 *   delete:
 *     summary: Delete an formation
 *     tags: [Formation]
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

formationRouter.delete('/delete/:Id', formationController.deleteFormation.bind(formationController))

export default formationRouter;