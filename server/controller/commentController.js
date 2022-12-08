import Comment from '../model/commentModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import Post from '../model/postModel.js';

const getAllComments = async (req, res) => {
    try {
        const allComments = await Comment.find({}).populate({path: 'author', select: 'username'}).populate({path: 'post', select: ['author', 'date', 'text']});
        res.json(allComments);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const getCommentsByPostId = async (req, res) => {
  let query = req.query
    try {
        const commentsById = await Comment.find(query).populate({path: 'author', select: ['username', 'profilePic']});
        res.json(commentsById);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const shareComment = async (req, res) => {

  const { text, img, date, author, post } = req.body;
  try {
    const newComment = new Comment({
      author: author,
      date: date,
      text: text,
      img: img,
      post: post,
    });
      
    try {
      const savedComment = await newComment.save();
      if (savedComment._id) {
        const query = { "_id": post};
        const updateDocument = {
          $push: { "comments": ObjectId(savedComment._id)}
        };
        const update = await Post.updateOne(query, updateDocument);
      }

      res.status(201).json({
        msg: "Comment sharing successful",
        comment: savedComment,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        msg: "Comment sharing error",
        error: error,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Comment sharing error",
      error: error,
    });
  }
};

const deleteComment = async (req, res) => {
  const { id, post } = req.body;
  try {
    const commentUpdate = await Comment.deleteOne({ _id: id });
    const query = { "_id": post};
    const updateDocument = {
      $pull: { "comments": ObjectId(id) }
    };
    const postUpdate = await Post.updateOne(query, updateDocument);

    res.status(201).json({
      msg: "Comment successfully deleted"
    });
    
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Post sharing error",
      error: error,
    });
  }
};

const imageUploadComments = async (req, res) => {
  try {
    console.log("req :>> ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "berlin-fantastic-creatures/comments",
    });
    console.log("result >>>>", result);
    res.status(200).json({
      msg: "Image successfully uploaded",
      image: result.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error uploading image",
      error: error,
    });
  }
};

const likeComment = async (req, res) => {

  const { user, comment } = req.body;

  try {
    const queryComment = { "_id": comment };
    const updateComment = {
      $push: { "likes": ObjectId(user) }
    };
    const update = await Comment.updateOne(queryComment, updateComment);
    res.status(201).json({ msg: "Comment successfully liked" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Error liking comment", error: error });
  }
};

const removeLike = async (req, res) => {
  const { user, comment } = req.body;

  try {
    const queryComment = { "_id": comment };
    const updateComment = {
      $pull: { "likes": ObjectId(user) }
    };
    const update = await Comment.updateOne(queryComment, updateComment);
    res.status(201).json({ msg: "Like successfully removed" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Error removing like", error: error });
  }
};


export {getAllComments, getCommentsByPostId, imageUploadComments, deleteComment, shareComment, likeComment, removeLike};