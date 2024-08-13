import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createLeadsValidationRules = () => {
  return [
    body('name')
      .optional(), 
    body('email')
      .notEmpty()
      .withMessage('O email não pode estar vazio')
      .bail()
      .isEmail()
      .withMessage('O email deve ser válido'),

      body('phone')
      .notEmpty()
      .withMessage('O contacto não pode estar vazio')
      .custom((value) => {
        const phoneRegex = /^\(\+244\)\s?\d{9}$/;
        
        if (!value.match(phoneRegex)) {
          throw new Error('O número de telefone deve estar no formato (+244) 930333042');
        }

        return true;
      }),



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