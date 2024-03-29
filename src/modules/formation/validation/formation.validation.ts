import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createFormationRules = () => {
  return [
    body('title')
      .optional(), 
       body('description')
      .notEmpty()
      .withMessage('A description não pode estar vazio'),
    body('startDate')
      .isString()
      .notEmpty()
      .withMessage('A startDate não pode estar vazio'),
    body('endDate')
    .isString()
    .notEmpty()
      .withMessage('A endDate não pode estar vazio'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive deve ser um valor booleano'),


  ];
};
export const updateFormationRules = () => {
  return [
    body('title')
      .optional(), 
       body('description')
      .notEmpty()
      .withMessage('A description não pode estar vazio'),
    body('startDate')
      .isString()
      .notEmpty()
      .optional()
      .withMessage('A startDate não pode estar vazio'),
    body('endDate')
    .isString()
    .notEmpty()
    .optional()
      .withMessage('A endDate não pode estar vazio'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive deve ser um valor booleano'),


  ];
};



export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map(error => error.msg);
 
  return  errorResponse(res,errorMessages,400)
};