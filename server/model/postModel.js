import mongoose from 'mongoose';

const { Schema } = mongoose;
const postSchema = new Schema({
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
        type: String,
        required: true,
        unique: false
    },
    category: {
        type: String,
        required: true,
        unique: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }],
    favourited: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }]
});
const Post = mongoose.model('Post', postSchema);
export default Post