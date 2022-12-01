import express from 'express';
import { getAllPosts, imageUploadPosts, sharePost } from '../controller/postController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllPosts);
router.post('/share', sharePost);
router.post('/imageupload', multerUpload.single("image"), imageUploadPosts);

export default router;