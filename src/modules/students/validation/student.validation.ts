import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createStudentValidationRules = () => {
  return [
    body('name')
      .optional(), 
    body('email')
      .notEmpty()
      .withMessage('O email não pode estar vazio')
      .bail()
      .isEmail()
      .withMessage('O email deve ser válido'),
    body('password')
     .isLength({ min: 6 })
      .isString()
      .withMessage('Adicione um senha valido e Forte'),
    body('accessLevelId')
      .optional()
      .isNumeric()
      .withMessage('O accessLevelId deve ser um número'),
      body('nif').isNumeric().isLength({ min: 9, max: 9 })
      .withMessage('O nif deve ser um valido'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive deve ser um valor booleano'),

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

    body('nif')
      .optional(),

    body('avatarUrl')
      .optional()

  ];
};
export const updateCreateValidationRules = () => {
  return [
    body('name')
      .optional(), 
    body('email')
      .notEmpty()
      .withMessage('O email não pode estar vazio')
      .bail()
      .isEmail()
      .withMessage('O email deve ser válido'),
    body('password')
     .isLength({ min: 6 })
      .isString()
      .withMessage('Adicione um senha valido e Forte'),
    body('accessLevelId')
      .optional()
      .isNumeric()
      .withMessage('O accessLevelId deve ser um número'),
      body('nif').isNumeric().isLength({ min: 9, max: 9 })
      .withMessage('O nif deve ser um valido'),
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive deve ser um valor booleano'),

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

    body('nif')
      .optional(),

    body('avatarUrl')
      .optional()

  ];
};
export const signStudentValidationRules = () => {
  return [

    body('email')
      .notEmpty()
      .withMessage('O email não pode estar vazio')
      .bail()
      .isEmail()
      .withMessage('O email deve ser válido'),
    body('password')
        .notEmpty()
      .isString()
      .withMessage('O Senha não pode estar vazio')
      
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