import ExperienceModel from './schema.js'
import UserModel from '../users/schema.js'
import q2m from 'query-to-mongo'
import createHttpError from 'http-errors'
import json2csv from 'json2csv'
import { pipeline } from 'stream'
import mongoose from 'mongoose'

// Create CSV for Experience
// const createCSV = async (req, res, next) => {
//     try {
//         res.setHeader("Content-Disposition", "attachment; filename=experience.csv") 

//         const id = req.params.id
//         const user = await UserModel.findById(id)
//         const exp =   ExperienceModel.findById(id)

//         const  source = exp
        
//         const transform = new json2csv.Transform({ fields: ["company"] })
//         const destination = res

//         pipeline(source, transform, destination, err => {
//             if (err) next(err)
//         })
//     } catch (error) {
//         console.error(error)
//         next(error)
//     }
// }

// Create new Experience
const createExperience = async (req, res, next) => {
    try {
        const userName = req.params.userName
        
        const experience = await ExperienceModel(req.body).save()
        console.log(experience)
        if(experience){
            const newExp = {...experience.toObject()}
            console.log(newExp)
            const updatedUser = await UserModel.findOneAndUpdate(
                userName,
                { $push: { experiences: experience._id}},
                { new: true }
            )
            res.status(201).send(updatedUser)
        } else {
            next(createHttpError(404, `Experience with id ${id} not found`))  
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Get all Experiences
const getAllExperiences = async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        console.log(mongoQuery)
        const total = await ExperienceModel.countDocuments(mongoQuery.criteria)
        const exp = await ExperienceModel.find({ userName: req.params.userName})
        .limit(mongoQuery.options.limit)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort)
        

        res.send({
            links: mongoQuery.links('/experience', total),
            pageTotal: Math.ceil(total / mongoQuery.options.limit),
            total,
            exp
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Get Experience by ID
const getExpByID = async (req, res, next) => {
    try {
        const id = req.params.id
        const exp = await ExperienceModel.findById(id)
        if (exp){
            res.send(exp)
        } else {
            next(createHttpError(404, `Experience with id ${id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Update or Modify Experience by ID
const updateExperience = async (req, res, next) => {
    try {
        const id = req.params.id
        const exp = await ExperienceModel.findByIdAndUpdate(id, req.body, {new: true})
        if (exp){
            res.status(203).send(exp)
        } else {
            next(createHttpError(404, `Experience with id ${id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }  
}

// Delete Experience by ID
const deleteExperience = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedEXp = await ExperienceModel.findByIdAndDelete(id)
        if (deletedEXp){
            res.status(204).send()
        } else {
            next(createHttpError(404, `Experience with id ${id} not found`))
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const experienceHandler = {
    createExperience,
    getAllExperiences,
    getExpByID,
    updateExperience,
    deleteExperience,
    // createCSV
}

export default experienceHandler