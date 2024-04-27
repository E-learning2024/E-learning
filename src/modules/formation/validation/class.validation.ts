import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createClassRules = () => {
  return [
       body('formationId')
      .notEmpty()
      .withMessage('A description não pode estar vazio'),
    body('name')
      .isString()
      .withMessage('A startDate não pode estar vazio'),
    body('description')
    .isString()
    .notEmpty()
      .withMessage('A endDate não pode estar vazio'),
    body('time')
      .notEmpty()
      .withMessage('informe a Hora !'),


  ];
};
export const updateClassRules = () => {
  return [
    body('instructorId')
      .optional(), 
       body('formationId')
       .optional()
      .notEmpty()
      .withMessage(' formador não pode estar vazio'),
    body('name')
    .optional()
      .isString()
      .withMessage('A startDate não pode estar vazio'),
    body('description')
    .optional()
    .isString()
    .notEmpty()
      .withMessage('A endDate não pode estar vazio'),
    body('time')
    .optional()
      .notEmpty()
      .withMessage('informe a Hora !'),


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