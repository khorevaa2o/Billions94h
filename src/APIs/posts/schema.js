import mongoose from 'mongoose';

const { Schema, model } = mongoose

const PostSchema = new Schema(
    {
        image: { type: String },
        text: { type: String, required: true },
        userName: { type: String },
        user: { type: Schema.Types.ObjectId, ref:'User' },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    },
    {
        timestamps: true
    }
)

export default model('Post', PostSchema)