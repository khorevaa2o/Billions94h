import express from 'express';
import postHandler from './p-handler.js'

const postRouter = express.Router()

postRouter.post('/:postId', postHandler.createPost)
postRouter.get('/', postHandler.getAllPosts)

export default postRouter