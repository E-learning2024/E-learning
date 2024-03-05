import { Request, Response, NextFunction } from "express";
import * as responses from "@utils/formaters/responses";
import { Codes } from "@utils/constants/codes";
import { HttpStatus } from "@utils/constants/httpStatus";
import { validationResult } from "express-validator/check";


export default function middlewareValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    
    const result = handleWithExpressValidationErrors(req, errors.array());
    if (result && result.hasError) {
      return {
        code:result.error.code,
       message: result.error.message,
        status:result.error.status
      }
    } 
  } else {
    next();
  }
}
