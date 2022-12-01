import Post from '../model/postModel.js';
import { v2 as cloudinary } from 'cloudinary';

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({}).populate({path: 'author', select: 'username'}).populate({path: 'comments', select: ['author', 'date', 'text']});
        console.log("allPosts", allPosts);
        res.json(allPosts);
    } catch (error) {
        console.log('error :>> ', error);
    }
};

const sharePost = async (req, res) => {
  
  console.log("req.body :>> ", req.body);
  const { text, img, date, author } = req.body;

  try {
    const newPost = new Post({
      author: author,
      date: date,
      text: text,
      img: img,
    });
      
    try {
      const savedPost = await newPost.save();
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

const imageUploadPosts = async (req, res) => {
  try {
    console.log("req :>> ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "berlin-fantastic-creatures/posts",
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

export {getAllPosts, imageUploadPosts, sharePost};