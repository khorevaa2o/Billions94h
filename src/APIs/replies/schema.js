import mongoose from 'mongoose';

const { Schema, model } = mongoose

const ReplySchema = new Schema(
    {
        text: {type: String, required: true},
        userName: { type: String },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        image: { type: String },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
    },
    {
        timestamps: true
    }
)

export default model('Reply', ReplySchema)



/***
 * 
 *   if my id is in likes then blue : white
 * 
 * 
 *    <Button color={post.likes.includes(myId) ? "primary":"secondary"}
 * 

 */