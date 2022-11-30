import Comment from '../model/commentModel.js';
import { v2 as cloudinary } from 'cloudinary';

const getAllComments = async (req, res) => {
    try {
        const allComments = await Comment.find({}).populate({path: 'author', select: 'username'}).populate({path: 'post', select: ['author', 'date', 'text']});
        console.log("allComments", allComments);
        res.json(allComments);
    } catch (error) {
        console.log('error :>> ', error);
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


export {getAllComments, imageUploadComments};