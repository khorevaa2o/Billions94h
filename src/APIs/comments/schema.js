import mongoose from 'mongoose';

const { Schema, model } = mongoose

const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        userName: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
    },
    {
        timestamps: true
    }
)

export default model('Comment', CommentSchema)