import express from 'express';
import usersHandler from './u-handler.js'
import { usersValidator } from './validator.js';

const usersRouter = express.Router()

usersRouter.get('/', usersHandler.getAllUsers)
usersRouter.post('/', usersValidator, usersHandler.createUser)

usersRouter.route('/:id')
.get(usersHandler.getUserById)
.put(usersHandler.updateUser)
.delete(usersHandler.deleteUser)

export default usersRouter