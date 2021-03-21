import ReplyModel from './schema.js';
import CommentModel from '../comments/schema.js';
import PostModel from '../posts/schema.js';

// Post Reply
const postReply = async (req, res, next) => {
    try {
        const id = req.params.id
        const commentId = req.params.commentId

        const post = await PostModel.findById(id)
        console.log('yay the comments ==============>', post)

       const reply = await ReplyModel(req.body)
       reply.posts = id
       console.log('==============> replies.comment', reply.comments)
       await reply.save()

       console.log(reply)
       if(reply){
           const newReply = {...reply.toObject(), }
           console.log('======================>', newReply)
           const updatedComment = await CommentModel.findOneAndUpdate(
               {_id: commentId},
               { $push: { replies: reply._id}},
               { new: true }
           )
           res.status(201).send(updatedComment)
       } else {
           next(createHttpError(404, `Comment with id ${id} not found`))  
       }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Get all Replies from a Comment
const getReplies = async (req, res, next) => {
    try {
        const id = req.params.id
       const comments = await CommentModel.findById(id)
       .populate({ path: "replies"})
        if(comments){
            res.send(comments)
        } else {
            next(createHttpError(404, `Comment with id ${id} not found`)) 
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Update or Modify Reply
const updateReply = async (req, res, next) => {
    try {
        const id = req.params.id
        let comment = await CommentModel.findById(id) 
        console.log("here is comment")
        console.log(comment)
         const replyId = req.params.replyId
         if (comment !== null){
            const updatedReply = await ReplyModel.findByIdAndUpdate(replyId, req.body, {new: true})
            console.log(updatedReply)
                if(updatedReply !== null){
                  res.status(203).send(updatedReply)
         } else {
            next(createHttpError(404,`Reply with id ${replyId} not found!`))
         }} else {
            next(createHttpError(404,`Comment with id ${id} not found!`))
         }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Delete Reply
const deleteReply = async (req, res, next) => {
    try {
        const replyId = req.params.replyId
        const id = req.params.id
        const reply = await ReplyModel.findByIdAndDelete(replyId)
        const comment = await CommentModel.findOneAndUpdate({_id: id},
            {$pull: {replies: reply._id}})
        if (comment) {
            res.send("deleted")
        } else{
            createHttpError(404,`Comment with id ${req.params.commentId} not found`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const repliesHandler = {
    postReply,
    getReplies,
    updateReply,
    deleteReply
}

export default repliesHandler