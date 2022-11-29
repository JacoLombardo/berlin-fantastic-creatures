import mongoose from 'mongoose';

const { Schema } = mongoose;
const commentSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    img: {
        type: Object,
        required: false,
        unique: false
    },
    meta: {
        likes: {
            type: Number,
            required: false,
            unique: false
        },
        favourites: {
            type: Number,
            required: false,
            unique: false
        }
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment