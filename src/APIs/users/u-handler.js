import UserModel from "./schema.js";
import createHttpError from "http-errors";
import q2m from 'query-to-mongo';
import mongoose from "mongoose"

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

// Post new Picture or Change existing one
const postPicture = async (req, res, next) => {
    try {
        const id = req.params.id
        const imgPath = req.file.path
        const user = await UserModel.findByIdAndUpdate(id, { $set: { image: imgPath }})
        res.status(203).send(user)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

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
        .populate({ path: 'experiences'})

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
        .populate({ path: 'experiences'})
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

// Friend Request
const acceptFriendReq = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log('==================>',id)
        let sendRequest = await UserModel.findById(id);
        if (sendRequest) {
          const request = await UserModel.findOne({
            _id: id,
            friends: new mongoose.Types.ObjectId(req.body.friendId),
          });

          const friendId = req.body.friendId;
          console.log('==================>',friendId)
          let sendRequest2 = await UserModel.findById(friendId);
          if (sendRequest2) {
            const request2 = await UserModel.findOne({
              _id: friendId,
              friends: new mongoose.Types.ObjectId(req.params.id),
            });
          console.log('i am liked', request)
    
          if (!request) {
            sendRequest =  await UserModel.findByIdAndUpdate(id, {
              $push: { friends: req.body.friendId }
            }, {new: true});
          } else {
            sendRequest  =  await UserModel.findByIdAndUpdate(id, {
              $pull: { friends: req.body.friendId },
            },{new:true});
          }

          if (!request2) {
            sendRequest2 =  await UserModel.findByIdAndUpdate(friendId, {
              $push: { friends: req.params.id }
            }, {new: true});
          } else {
            sendRequest2  =  await UserModel.findByIdAndUpdate(friendId, {
              $pull: { friends: req.params.id },
            },{new:true});
          }
          res.status(201).send({sendRequest, sendRequest2});
        } else {
          next(createHttpError(404, `post with this id ${id} not found`));
        }
          
     } 
      } catch (error) {
        next(error);
      }
}

const usersHandler = {
    createUser,
    postPicture,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    // sendFriendReq,
    acceptFriendReq

};

export default usersHandler;














// Friend Request
// const sendFriendReq = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         console.log('==================>',id)
//         let sendRequest = await UserModel.findById(id);
//         if (sendRequest) {
//           const request = await UserModel.findOne({
//             _id: id,
//             friends: new mongoose.Types.ObjectId(req.body.friendId),
//           });
//           console.log('i am liked', request)
    
//           if (!request) {
//             sendRequest =  await UserModel.findByIdAndUpdate(id, {
//               $push: { friends: req.body.friendId }
//             }, {new: true});
//           } else {
//             sendRequest  =  await UserModel.findByIdAndUpdate(id, {
//               $pull: { friends: req.body.friendId },
//             },{new:true});
//           }
//         } else {
//           next(createHttpError(404, `post with this id ${id} not found`));
//         }
          
//         res.status(201).send(sendRequest);
//       } catch (error) {
//         next(error);
//       }
// }