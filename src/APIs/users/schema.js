import mongoose from 'mongoose';

const { Schema, model } = mongoose

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        image: { type: String, required: true },
        userName: { type: String, required: true },
        password: { type: String, required: true },
        job: { type: String, required: true },
        bio: { type: String, required: true },
        area: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

export default model('User', UserSchema)