import express from 'express';
import { getAllPosts, imageUploadPosts } from '../controller/postController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllPosts);
router.post('/imageupload', multerUpload.single("image"), imageUploadPosts);

export default router;