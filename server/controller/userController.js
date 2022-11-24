import User from '../model/userModel.js';

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}).populate({path: 'posts'});
        console.log("allUsers", allUsers);
        res.json(allUsers);
    } catch (error) {
        console.log('error :>> ', error);
    }
};


export {getAllUsers};