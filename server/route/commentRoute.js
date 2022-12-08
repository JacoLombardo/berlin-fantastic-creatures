import express from 'express';
import { getAllComments, imageUploadComments, getCommentsByPostId, deleteComment, shareComment, likeComment, removeLike } from '../controller/commentController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllComments);
router.get('/comment', getCommentsByPostId);
router.post('/share', shareComment);
router.post('/delete', deleteComment);
router.post('/imageupload', multerUpload.single("image"), imageUploadComments);
router.post('/likes', likeComment);
router.post('/removelike', removeLike);

export default router;