import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createMaterialRules = () => {
  return [
    body('classId')
     .notEmpty()
     .withMessage('A classId não pode estar vazio'),
       body('title')
      .notEmpty()
      .withMessage('A title não pode estar vazio'),
    body('description')
      .notEmpty()
      .withMessage('A description não pode estar vazio'),
 


  ];
};
export const updateMaterialRules = () => {
  return [
    body('classId')
    .notEmpty()
    .withMessage('A classId não pode estar vazio'),
      body('title')
     .notEmpty()
     .withMessage('A title não pode estar vazio'),
   body('description')
     .isString()
     .withMessage('A description não pode estar vazio'),




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