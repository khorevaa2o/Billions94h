import express from 'express';
import postHandler from './p-handler.js'

const postRouter = express.Router()

postRouter.post('/:userId', postHandler.createPost)
postRouter.get('/', postHandler.getAllPosts)

postRouter.route('/:id')
.get(postHandler.getPostById)
.put(postHandler.updatePost)
.delete(postHandler.deletePost)

export default postRouter