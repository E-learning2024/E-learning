import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createClassRules = () => {
  return [
    body('instructorId')
      .optional(), 
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