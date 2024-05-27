import { body, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a String"),
  body("adressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be string"),

  body("city").isString().notEmpty().withMessage("City must be a String"),
  body("country").isString().notEmpty().withMessage("Country must be a String"),
  handleValidationErrors,
];
