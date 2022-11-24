import Comment from '../model/commentModel.js';

const getAllComments = async (req, res) => {
    try {
        const allComments = await Comment.find({}).populate({path: 'author', select: 'username'}).populate({path: 'post', select: ['author', 'date', 'text']});
        console.log("allComments", allComments);
        res.json(allComments);
    } catch (error) {
        console.log('error :>> ', error);
    }
};


export {getAllComments};