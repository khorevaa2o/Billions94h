import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import { badRequest, notFound, unAuthorized, genericError} from './error-handlers.js';
import mongoose from 'mongoose';
import usersRouter from './APIs/users/index.js';
import postRouter from './APIs/posts/index.js';
import experienceRouter from './APIs/experience/index.js';


const server = express();

// Global middlewares
server.use(cors())
server.use(express.json())

// Routes
server.use('/users', usersRouter)
server.use('/posts', postRouter)
server.use('/experience', experienceRouter)




// Error handling middlewares
server.use(badRequest)
server.use(notFound)
server.use(unAuthorized)
server.use(genericError)

const { PORT, MONGO_CONNECTION } = process.env

mongoose.connect(MONGO_CONNECTION)

mongoose.connection.on('connected', () => {
    console.log('Database connected ✅ ✅')
    server.listen(PORT, () => {
        console.log('Server connected ✅', PORT)
        console.table(listEndpoints(server))
    })
})
