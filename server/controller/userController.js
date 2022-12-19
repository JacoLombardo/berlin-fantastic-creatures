import User from '../model/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import encryptPassword from '../tools/encryptPassword.js';
import isPasswordCorrect from '../tools/isPasswordCorrect.js';
import issueToken from '../tools/jwt.js';
import { ObjectId } from 'mongodb';
import Post from '../model/postModel.js';
import Comment from '../model/commentModel.js';
import { validationResult } from 'express-validator';

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}).populate({path: 'posts'});
        res.json(allUsers);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const getUserById = async (req, res) => {
    
    let query = req.query
    try {
        const userById = await User.findOne(query).populate({path: 'posts'}).populate({path: 'favourites'});
        res.json(userById);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const registerUser = async (req, res) => {

    const { firstName, lastName, username, email, password } = req.body;

    try {
        const errors = validationResult(req).array();
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            errors.push({ msg: "Username already in use" });
        };
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            errors.push({ msg: "Email already in use" });
        };
        if (errors.length > 0) {
            console.log(errors);
            return res.status(500).json({
                errors: errors
            });
        };
        const hashedPassword = await encryptPassword(password);
        const blankPic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
            profilePic: blankPic,
        });
        try {
            const savedUser = await newUser.save();
            res.status(201).json({ msg: "Registration successful", user: savedUser });
        } catch (error) {
            console.log("error", error);
            res.status(500).json({ msg: "Registration error", error: error });
        };
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Registration error", error: error });
    };
};

const updateUserInfo = async (req, res) => {
    const { firstName, lastName, username, email, password, id, profilePic, img_id, bio } = req.body;

    try {
        if (username) {
            const existingUsername = await User.findOne({ username: username });
            if (existingUsername) { res.status(400).json({ errors: { msg: "Username already in use" } });
            } else {
                const updateUser = await User.updateOne({ _id: id }, { username: username });
                res.status(201).json({ msg: "Update successful", username: username }); 
            };
        } if (firstName) {
            const updateUser = await User.updateOne({ _id: id }, { firstName: firstName });
            res.status(201).json({ msg: "Update successful", firstName: firstName });
        } if (lastName) {
            const updateUser = await User.updateOne({ _id: id }, { lastName: lastName });
            res.status(201).json({ msg: "Update successful", lastName: lastName });
        } if (email) {
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                res.status(400).json({ errors: { msg: "Email already in use" } });
            } else {
                const updateUser = await User.updateOne({ _id: id }, { email: email });
                res.status(201).json({ msg: "Update successful", email: email });
            };
        } if (profilePic) {
            const updateUser = await User.updateOne({ _id: id }, { profilePic: profilePic, img_id: img_id });
            res.status(201).json({ msg: "Update successful", profilePic: profilePic, img_id: img_id });
        } if (bio) {
            const updateUser = await User.updateOne({ _id: id }, { bio: bio });
            res.status(201).json({ msg: "Update successful", bio: bio });
        } if (password) {
            const hashedPassword = await encryptPassword(password);
            const updateUser = await User.updateOne({ _id: id }, { password: hashedPassword });
            res.status(201).json({ msg: "Update successful", password: hashedPassword });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Error updating info", error: error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            res.status(200).json({ errors: [{ msg: "Invalid email" }] });
        } else {
            const verified = await isPasswordCorrect(password, existingUser.password);
            if (verified) {
                const token = issueToken(existingUser._id);
                res.status(200).json({
                    msg: "Sucessfully logged in",
                    user: existingUser,
                    token,
                });
            } else {
                res.status(401).json({ errors: [{ msg: "Wrong password" }] });
            }
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Login error" });
    }
};

const loginWithGoogle = async (req, res) => {

};

const deleteUser = async (req, res) => {
    const { user } = req.body;
    try {
        ///// USER
        // delete user from favourited
        const queryFavUser = { "favourited": ObjectId(user) };
        const updateFavUserDocument = {
            $pull: { "favourited": ObjectId(user) }
        };
        const userFavouritedUserUpdate = await Post.updateMany(queryFavUser, updateFavUserDocument);
        ///// POSTS
        // get posts by author
        const posts = await Post.find({ "author": user });
        for (let i = 0; i < posts.length; i++){
            // delete comments to post
            const commentDelete = await Comment.deleteMany({ "post": ObjectId(posts[i]._id) });
            // delete post from favourites
            const queryFavouritesDelete = { "favourites": ObjectId(posts[i]._id) };
            const updateFavouritesDelete = {
                $pull: { "favourites": ObjectId(posts[i]._id) }
            };
            const postFavouritesDelete = await User.updateMany(queryFavouritesDelete, updateFavouritesDelete);
            // delete image post
            if (posts[i].img_id) {
                const postImageDelete = await cloudinary.uploader.destroy(posts[i].img_id);
            };
            // delete post
            const postsDelete = await Post.deleteOne({ "_id": posts[i]._id });
        };
        ///// COMMENTS
        // delete likes to comment
        const queryCommentLike = { "likes": ObjectId(user) };
        const updateCommentLike = {
            $pull: { "likes": ObjectId(user) }
        };
        const commentLikeUpdate = await Comment.updateMany(queryCommentLike, updateCommentLike);
        // delete user
        const deleteUser = await User.deleteOne({ _id: user });
        // delete image user
        if (user.img_id) {
            const userImageDelete = await cloudinary.uploader.destroy(user.img_id);
        };

        res.status(200).json({ msg: "Account successfully deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Error deleting account",
      error: error,
    });
  }
};

const imageUploadUser = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { 
        folder: "berlin-fantastic-creatures/profilePics",
    });
    res.status(200).json({ msg: "Image successfully uploaded", image: result.url, img_id: result.public_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error uploading image", error: error });
  }
};

const getProfile = async (req, res) => {

    const { user } = req;
    
  res.status(200).json({ user: user });
};

const imageDeleteUser = async (req, res) => {
    const { img_id } = req.body;
    try {
        const result = await cloudinary.uploader.destroy(img_id);
        res.status(200).json({ msg: "Image successfully deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error deleting image", error: error });
    }
};

export { getAllUsers, registerUser, imageUploadUser, loginUser, getUserById, getProfile, updateUserInfo, deleteUser, imageDeleteUser, loginWithGoogle };