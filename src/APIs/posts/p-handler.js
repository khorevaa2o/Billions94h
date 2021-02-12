import PostModel from './schema.js'
import UserModel from '../users/schema.js'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import q2m from 'query-to-mongo'

//Create new Post
const createPost = async (req, res, next) => {
    try {
        const userName = req.params.userName
        const user = await UserModel.findOne({ userName: userName })
        console.log('=============================>', user._id)
        const newPost = new PostModel(req.body)
        newPost.user = user._id
        await newPost.save()
        if (newPost){
            res.status(201).send(newPost)
        } else {
            next(createHttpError(404, `Unable to create Post`))
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Get all Posts
const getAllPosts = async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        const total = await PostModel.countDocuments(mongoQuery.criteria)
        const posts = await PostModel.find(mongoQuery.criteria)
        .limit(mongoQuery.options.limit)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort)
        .populate({ path: 'user'})
        .populate({ path: 'comments'})
        res.send({
            links: mongoQuery.links('/posts', total),
            pageTotal: Math.ceil(total / mongoQuery.options.limit),
            total,
            posts
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// Get specify Post by ID
const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await PostModel.findById(id)
        .populate({ path: 'user'})
        if(post){
            res.send(post)
        } else {
            next(createHttpError(404, `Post with id ${req.params.id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Update or Modify Post by ID
const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await PostModel.findByIdAndUpdate(id, req.body, {new: true})
        if (post){
            res.status(203).send(post)
        } else {
            next(createHttpError(404, `Post with id ${req.params.id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Delete Post by ID
const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedPost = await PostModel.findByIdAndDelete(id)
        if (deletedPost){
            res.status(204).send(deletedPost)
        } else {
            next(createHttpError(404, `Post with id ${req.params.id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const postHandler = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}

export default postHandler