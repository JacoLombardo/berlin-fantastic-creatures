import Post from '../model/postModel.js';
import { v2 as cloudinary } from 'cloudinary';
import User from '../model/userModel.js';
import { ObjectId } from 'mongodb';
import Comment from '../model/commentModel.js';

const getPostsUbahn = async (req, res) => {
    try {
      const postsUbahn = await Post.find({ category: "ubahn" }).populate({ path: 'author', select: ['username', 'profilePic'] }).populate({ path: 'comments'}).populate({path: 'favourited', select: ['username', 'profilePic']}).populate({path: 'likes', select: ['username', 'profilePic']});
        res.json(postsUbahn);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const getPostsCity = async (req, res) => {
    try {
        const postsCity = await Post.find({category: "city"}).populate({path: 'author', select: ['username', 'profilePic']}).populate({path: 'comments'}).populate({path: 'favourited', select: ['username', 'profilePic']}).populate({path: 'likes', select: ['username', 'profilePic']});
        res.json(postsCity);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const getPostsByAuthor = async (req, res) => {
  let query = req.query
    try {
        const postsAuthor = await Post.find(query).populate({path: 'author', select: ['username', 'profilePic']}).populate({path: 'comments'}).populate({path: 'favourited', select: ['username', 'profilePic']}).populate({path: 'likes', select: ['username', 'profilePic']});
        res.json(postsAuthor);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const getPostById = async (req, res) => {
  let query = req.query
    try {
        const postId = await Post.findOne(query).populate({path: 'author', select: ['username', 'profilePic']}).populate({path: 'comments'}).populate({path: 'favourited', select: ['username', 'profilePic']}).populate({path: 'likes', select: ['username', 'profilePic']});
        res.json(postId);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const sharePost = async (req, res) => {
  const { text, img, date, author, category, img_id } = req.body;
  try {
    const newPost = new Post({
      author: author,
      date: date,
      text: text,
      img: img,
      img_id: img_id,
      category: category,
    });
      
    try {
      const savedPost = await newPost.save();
      if (savedPost._id) {
        const query = { "_id": author};
        const updateDocument = {
          $push: { "posts": ObjectId(savedPost._id)}
        };
        const update = await User.updateOne(query, updateDocument);
      }
      
      res.status(201).json({
        msg: "Post sharing successful",
        post: savedPost,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        msg: "Post sharing error",
        error: error,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Post sharing error",
      error: error,
    });
  }
};

const deletePost = async (req, res) => {
  const { post, user, img_id } = req.body;
  try {
    // delete post from user
    const query = { "_id": user};
    const updateDocument = {
      $pull: { "posts": ObjectId(post) }
    };
    const userUpdate = await User.updateOne(query, updateDocument);
    // delete post from favourites
    const queryFav = { "favourites": ObjectId(post) };
    const updateFavDocument = {
        $pull: { "favourites": ObjectId(post) }
    };
    const userFavouritedUpdate = await User.updateMany(queryFav, updateFavDocument);
    // delete comments of post
    const commentUpdate = await Comment.deleteMany({ "post": ObjectId(post) });
    // delete image post
    const postImage = await cloudinary.uploader.destroy(img_id);
    // delete post
    const postUpdate = await Post.deleteOne({ _id: post });

    res.status(201).json({ msg: "Post successfully deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Post deleting error",
      error: error,
    });
  }
};

const updatePost = async (req, res) => {
    const { id, text, img, img_id } = req.body;

    try {
        if (text) {
            const updatePost = await Post.updateOne({ _id: id }, { text: text });
            res.status(201).json({ msg: "Update successful", text: text });
        } if (img) {
            const updatePost = await Post.updateOne({ _id: id }, { img: img, img_id: img_id });
            res.status(201).json({ msg: "Update successful", img: img, img_id: img_id });
      }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "Error updating info", error: error });
    }
};

const favPost = async (req, res) => {

  const { user, post } = req.body;

  try {
    const queryPost = { "_id": post };
    const updatePost = {
      $push: { "favourited": ObjectId(user) }
    };
    const update1 = await Post.updateOne(queryPost, updatePost);

    const queryUser = { "_id": user };
    const updateUser = {
      $push: { "favourites": ObjectId(post) }
    };
    const update2 = await User.updateOne(queryUser, updateUser);
    
    res.status(201).json({ msg: "Post successfully added to favourites" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Error adding post to favourites",
      error: error,
    });
  }
};

const removeFav = async (req, res) => {
  const { user, post } = req.body;

  try {
    const queryPost = { "_id": post };
    const updatePost = {
      $pull: { "favourited": ObjectId(user) }
    };
    const update1 = await Post.updateOne(queryPost, updatePost);

    const queryUser = { "_id": user };
    const updateUser = {
      $pull: { "favourites": ObjectId(post) }
    };
    const update2 = await User.updateOne(queryUser, updateUser);
    
    res.status(201).json({
      msg: "Post successfully removed from favourites"
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Error removing post from favourites",
      error: error,
    });
  }
};

const likePost = async (req, res) => {

  const { user, post } = req.body;

  try {
    const queryPost = { "_id": post };
    const updatePost = {
      $push: { "likes": ObjectId(user) }
    };
    const update = await Post.updateOne(queryPost, updatePost);
    
    res.status(201).json({
      msg: "Post successfully liked"
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Error liking post",
      error: error,
    });
  }
};

const removeLike = async (req, res) => {
  const { user, post } = req.body;

  try {
    const queryPost = { "_id": post };
    const updatePost = {
      $pull: { "likes": ObjectId(user) }
    };
    const update = await Post.updateOne(queryPost, updatePost);
    
    res.status(201).json({
      msg: "Like successfully removed"
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Error removing like",
      error: error,
    });
  }
};

const imageUploadPosts = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "berlin-fantastic-creatures/posts",
    });
    console.log("result >>>>", result);
    res.status(200).json({
      msg: "Image successfully uploaded",
      image: result.url,
      img_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error uploading image",
      error: error,
    });
  }
};

export { getPostsUbahn, getPostsCity, imageUploadPosts, sharePost, getPostsByAuthor, deletePost, favPost, removeFav, likePost, removeLike, getPostById, updatePost };