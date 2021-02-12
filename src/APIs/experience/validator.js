import { body } from 'express-validator'

export const expValidator = [
    body("role").exists().withMessage("Role is required!"),
    body("company").exists().withMessage("Company is required!"),
    body("startDate").exists().withMessage("StartDate is required!"),
    body("endDate").exists().withMessage("EndDate is required!"),
    body("description").exists().withMessage("Description is required!"),
    body("area").exists().withMessage("Area is required!"),
    body("userName").exists().withMessage("Username is required!"),
    
]