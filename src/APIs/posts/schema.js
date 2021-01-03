import mongoose from 'mongoose';

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        image: { type: String },
        text: { type: String, required: true },
        userName: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref:'User' }
    },
    {
        timestamps: true
    }
)

export default model('Post', PostSchema)