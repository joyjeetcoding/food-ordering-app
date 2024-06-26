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
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be string"),

  body("city").isString().notEmpty().withMessage("City must be a String"),
  body("country").isString().notEmpty().withMessage("Country must be a String"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
  body("city").notEmpty().withMessage("City is requried"),
  body("country").notEmpty().withMessage("Country is requried"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery Price must be positive number"),
  body("estimateDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated Delivery TIme must be positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be an array"),
  // the below code inside body means for each menuItems we are going to apply the following validation rules
  body("menuItems.*.name").notEmpty().withMessage("Menu Item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price is required and must be a positive number"),
  handleValidationErrors,
];
