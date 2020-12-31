import { body } from 'express-validator'

export const usersValidator = [
    body("name").exists().withMessage("Name is required!"),
    body("surname").exists().withMessage("Surname is required!"),
    body("email").exists().withMessage("Email is required!"),
    body("userName").exists().withMessage("UserName is required!"),
    body("password").exists().withMessage("Password is required!"),
    body("job").exists().withMessage("Job is required!"),
    body("bio").exists().withMessage("Bio is required!"),
    body("address").exists().withMessage("Address is required!"),
]