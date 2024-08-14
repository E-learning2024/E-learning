import { Router } from "express";
import { LeadsService } from "./service/leads.service";
import { LeadsController } from "./controller/leads.controller";
import { createLeadsValidationRules, validate } from "./validation/leads.validation";
import { LeadsRepository } from "./repository/leads.repository";

const leadsRepository = new LeadsRepository()
const  leadsService = new LeadsService(leadsRepository)
const leadsController = new LeadsController(leadsService); 


const leadsRouter = Router()
/**
 * @swagger
 * /leads/create:
 *   post:
 *     summary: Create a new lead
 *     tags: [LEAD]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeadDTO'
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateLeadDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *           description: Name of the lead
 *         email:
 *           type: string
 *           example: "email@example.com"
 *           description: Email of the lead
 *         phone:
 *           type: string
 *           example: "(123) 456-7890"
 *           description: Phone number of the lead
 *         message:
 *           type: string
 *           example: "I'm interested in your services."
 *           description: Message from the lead
 */

leadsRouter.post('/create', leadsController.create.bind(leadsController))

/**
 * @swagger
 * /leads/findAll:
 *   get:
 *     summary: Get all leads
 *     tags: [LEAD]
 *     responses:
 *       200:
 *         description: List of leads retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateLeadDTO'
 *       400:
 *         description: Bad request
 */
leadsRouter.get('/findAll', leadsController.findAll.bind(leadsController))

/**
 * @swagger
 * /leads/findById/{leadId}:
 *   get:
 *     summary: Get a lead by ID
 *     tags: [LEAD]
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the lead to retrieve
 *     responses:
 *       200:
 *         description: Lead retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateLeadDTO'
 *       404:
 *         description: Lead not found
 *       400:
 *         description: Bad request
 */
leadsRouter.get('/findById/:leadId', leadsController.findById.bind(leadsController))

/**
 * @swagger
 * /leads/delete/{leadId}:
 *   delete:
 *     summary: Delete a lead by ID
 *     tags: [LEAD]
 *     parameters:
 *       - in: path
 *         name: leadId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the lead to delete
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       400:
 *         description: Bad request
 */
leadsRouter.delete('/delete/:leadId', leadsController.delete.bind(leadsController))


export default leadsRouter;