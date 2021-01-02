import PostModel from './schema.js'
import UserModel from '../users/schema.js'
import createHttpError from 'http-errors'

//Create new Post
const createPost = async (req, res, next) => {
    try {
        const postId = req.params.id

        const post = await PostModel.findById(postId)
        if

    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Get all Posts
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find(req.body)
        .populate({ path: 'user' })
        res.send(posts)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const postHandler = {
    createPost,
    getAllPosts,
}

export default postHandler