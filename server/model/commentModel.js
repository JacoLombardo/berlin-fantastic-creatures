import mongoose from 'mongoose';

const { Schema } = mongoose;
const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        required: true,
        unique: false
    },
    text: {
        type: String,
        required: true,
        unique: false
    },
    likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }],
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment