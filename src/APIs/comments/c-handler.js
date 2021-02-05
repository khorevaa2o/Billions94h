import CommentModel from './schema.js'
import PostModel from '../posts/schema.js'
import q2m from 'query-to-mongo'
import mongoose from 'mongoose'

// Create new Comment
const createComment = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const comment = await CommentModel(req.body)
        comment.posts = id
        await comment.save()

        console.log(comment)
        if(comment){
            const newComment = {...comment.toObject(), }
            console.log('======================>', newComment)
            const updatedPost = await PostModel.findOneAndUpdate(
                {_id: id},
                { $push: { comments: comment._id}},
                { new: true }
            )
            res.status(201).send(updatedPost)
        } else {
            next(createHttpError(404, `Experience with id ${id} not found`))  
        }
    } catch (error) {
       console.error(error) 
       next(error)
    }
}

// Get all Comments
const getAllComments = async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        console.log(mongoQuery)
        const total = await CommentModel.countDocuments(mongoQuery.criteria)
        const post = await PostModel.findById(req.params.id)
        .limit(mongoQuery.options.limit)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort)
        .populate({ path: 'comments', select: 'text'})
        if(post){
            const comments = post.comments

            res.send({
                links: mongoQuery.links('/experience', total),
                pageTotal: Math.ceil(total / mongoQuery.options.limit),
                total,
                comments
            })
        } else {
            next(createHttpError(404,`Comment with id ${req.params.commentsId} not found!`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Update the Comment
const updateComment = async (req, res, next) => {
 try {
     const id = req.params.id
     const updatedComment = await CommentModel.findByIdAndUpdate(id, req.body, {new: true})
     if(updatedComment){
         res.status(203).send(updatedComment)
     } else {
        next(createHttpError(404,`Comment with id ${id} not found!`))
     }
 } catch (error) {
    console.error(error)
    next(error)
 }
}

const commentsHandler = {
    createComment,
    getAllComments,
    updateComment
}

export default commentsHandler