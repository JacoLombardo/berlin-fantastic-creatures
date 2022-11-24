import Post from '../model/postModel.js';

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({}).populate({path: 'author', select: 'username'}).populate({path: 'comments', select: ['author', 'date', 'text']});
        console.log("allPosts", allPosts);
        res.json(allPosts);
    } catch (error) {
        console.log('error :>> ', error);
    }
};


export {getAllPosts};