import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: date,
        required: true,
        unique: true,
    },
    image: {
        type: Object,
        required: false,
        unique: false,
    }
});
const Comment = mongoose.model('Comment', commentSchema);
export default Comment