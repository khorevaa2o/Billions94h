import UserModel from "./schema.js";
import createHttpError from "http-errors";
import q2m from 'query-to-mongo'

// Create new User
const createUser = async (req, res, next) => {
  try {
      const newUser = new UserModel(req.body)
      const {_id} = await newUser.save()
      res.status(201).send({_id})
  } catch (error) {
    console.log(error)
    next(error);
  }
};

// Get all Users
const getAllUsers = async (req, res, next) => {
    try {
        const mongoQuery = q2m(req.query)
        console.log(mongoQuery)

        const total = await UserModel.countDocuments(mongoQuery.criteria)
        const users = await UserModel.find(mongoQuery.criteria)
        .limit(mongoQuery.options.limit)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort)

        res.send({
            links: mongoQuery.links('/users', total),
            pageTotal: Math.ceil(total / mongoQuery.options.limit),
            total,
            users
        })

    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Get specify User by ID
const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await UserModel.findById(id)
        if (user){
            res.send(user)
        } else {
            next(createHttpError(404, `User with this id ${req.params.id} not found`))
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Update or Modify User by ID
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {new: true})
        if (updatedUser){
            res.status(203).send(updatedUser)
        } else {
            next(createHttpError(404, `User with this id ${req.params.id} not found`))
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const deleteUser = await UserModel.findByIdAndDelete(id)
        if (deleteUser){
            res.status(204).send(deleteUser)
        } else {
            next(createHttpError(404, `User with this id ${req.params.id} could not be deleted`))
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const usersHandler = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default usersHandler;
