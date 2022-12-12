import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    profilePic: {
        type: String,
        required: false,
        unique: false,
    },
    img_id: {
        type: String,
        required: false,
        unique: false,
    },
    bio: {
        type: String,
        required: false,
        unique: false,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});
const User = mongoose.model('User', userSchema);
export default User