import mongoose from 'mongoose';

const { Schema, model } = mongoose

const CommentSchema = new Schema(
    {
        text: { type: String, required: true },
        userName: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        image: { type: String},
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
        replies: [{ type: Schema.Types.ObjectId, ref: 'Reply'}]
    },
    {
        timestamps: true
    }
)

export default model('Comment', CommentSchema)