import mongoose from 'mongoose';

const { Schema } = mongoose;
const postSchema = new Schema({
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
        required: false,
        unique: false
    },
    img: {
        type: String,
        required: true,
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    
});
const Post = mongoose.model('Post', postSchema);
export default Post