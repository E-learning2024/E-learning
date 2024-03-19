import { Router } from "express";
import { FormationRepository } from "./repository/formation.repository";
import { FormationService } from "./service/formation.service";
import { FormationController } from "./controller/formation.controller";
import { createFormationRules, validate } from "./validation/formation.validation";

const formationRepository = new FormationRepository()
const formationService = new FormationService(formationRepository); 
const formationController = new FormationController(formationService); 


const formationRouter = Router()
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
formationRouter.post('/create',createFormationRules(),validate, formationController.create.bind(formationController))
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
formationRouter.get('/findAll-formation', formationController.findAllFormation.bind(formationController))
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
formationRouter.get('/findOne-formation/:Id', formationController.findOneFormation.bind(formationController))

export default formationRouter;