import express from 'express';
import usersHandler from './u-handler.js';
import experienceHandler from '../experience/e-handler.js';
import { usersValidator } from './validator.js';
import UserModel from './schema.js'
import { getPDFReadableStream } from '../pdf/pdfTools.js';
import { pipeline } from "stream";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

const usersRouter = express.Router()

// IMAGE CLOUD STORAGE
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary, // CREDENTIALS,
  params: {
    folder: "linkedIN-BE",
  },
});

usersRouter.get('/', usersHandler.getAllUsers)
usersRouter.post('/', usersValidator, usersHandler.createUser)

usersRouter.put('/:id/upload', multer({ storage: cloudinaryStorage}).single('image'), usersHandler.postPicture)

usersRouter.get('/:id/CV', async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await UserModel.findById(id)
    
        if(!data){
          res
          .status(404)
          .send({ message: `data with id ${id} is not found!` });
        } else {
          res.setHeader("Content-Disposition", `attachment; filename=${data.id}.pdf`)
    
          const source = await getPDFReadableStream(data) 
          const destination = res
      
          pipeline(source, destination, err => {
            if (err) next(err)
          })
        }
      } catch (error) {
        next(error)
      }
})

usersRouter.route('/:id')
.get(usersHandler.getUserById)
.put(usersHandler.updateUser)
.delete(usersHandler.deleteUser)


/******************************************* Experience Crud Section  *****************************************/
usersRouter.get('/:userName/experiences/CSV', experienceHandler.createCSV)
usersRouter.post('/:userName/experiences', experienceHandler.createExperience)
usersRouter.get('/:userName/experiences', experienceHandler.getAllExperiences)
usersRouter.put('/:userName/experiences/:expId/upload', multer({ storage: cloudinaryStorage}).single('image'), experienceHandler.postImage)

usersRouter.route('/:userName/experiences/:expId')
.get(experienceHandler.getExpByID)
.put(experienceHandler.updateExperience)
.delete(experienceHandler.deleteExperience)

/********************************************* Friends Crud Section  ******************************************/
// usersRouter.post('/:id/friends', usersHandler.sendFriendReq)
usersRouter.post('/:id/friends', usersHandler.acceptFriendReq)

export default usersRouter