import mongoose from 'mongoose';

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref:'User' },
        image: { type: String },
        text: { type: String, required: true },
        userName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export default model('Post', PostSchema)