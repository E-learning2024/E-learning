import { body } from "express-validator/check";
import { Codes } from "@utils/constants/codes";
import { HttpStatus } from "@utils/constants/httpStatus";
import { i18nKeys } from "@utils/constants/i18n";
import i18next from "i18next";
import iban from "iban";
import middlewareValidation from "@utils/middlewares/validations";

export const nameValidation = [
  body("name")
    .not()
    .matches(/\d/)
    .withMessage(() => ({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.REQUEST__INVALID_NAME,
      message: i18next.t(i18nKeys.INVALID_FORMAT_NAME)
    }))
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  middlewareValidation
];

export const removeVariantPicture = [
  body("imageUrl")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  middlewareValidation
];

export const createValidation = [
  body("admins")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  body("location")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  body("address")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  middlewareValidation
];

// Importar isto na rota