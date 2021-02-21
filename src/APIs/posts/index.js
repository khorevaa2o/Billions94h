import express from 'express';
import postHandler from './p-handler.js'
import commentsHandler from '../comments/c-handler.js';

const postRouter = express.Router()

postRouter.post('/:userName', postHandler.createPost)
postRouter.get('/', postHandler.getAllPosts)

postRouter.route('/:id')
.get(postHandler.getPostById)
.put(postHandler.updatePost)
.delete(postHandler.deletePost)

/********************************************** Like Crud Section **********************************/
postRouter.put('/:id/likes', postHandler.postLike)

/********************************** Comments Crud Section  ************************************/
postRouter.post('/:id/comments', commentsHandler.createComment)
postRouter.get('/:id/comments', commentsHandler.getAllComments)

postRouter.route('/:id/comments/:commentId')
.put(commentsHandler.updateComment)
.get(commentsHandler.getCommentById)
.delete(commentsHandler.deleteComment)



export default postRouter