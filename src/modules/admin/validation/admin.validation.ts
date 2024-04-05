import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../../handler/responseHandler';


export const createAdminValidationRules = () => {
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
export const updateAdminValidationRules = () => {
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
    .optional()
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
      .optional()
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
export const signAdminValidationRules = () => {
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
export const createTeamAdminValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('O nome não pode estar vazio'),
    body('description')
      .notEmpty()
      .withMessage('A descrição não pode estar vazia'),
    body('leaderId')
      .notEmpty()
      .withMessage('O ID do líder não pode estar vazio')
      .bail()
      .isNumeric()
      .withMessage('O ID do líder deve ser um número'),
    body('members')
      .custom((value) => {
        if (!Array.isArray(value)) {
          throw new Error('Os membros devem ser um array');
        }
        for (const member of value) {
          if (typeof member.id !== 'number') {
            throw new Error('Cada membro deve ter um ID numérico');
          }
        }
        return true;
      })
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