import express from 'express';
import experienceHandler from './e-handler.js';

const experienceRouter = express.Router()

experienceRouter.post('/:userId', experienceHandler.createExperience)

experienceRouter.get('/', experienceHandler.getAllExperiences)

experienceRouter.route('/:id')
.get(experienceHandler.getExpByID)
.put(experienceHandler.updateExperience)
.delete(experienceHandler.deleteExperience)

export default experienceRouter