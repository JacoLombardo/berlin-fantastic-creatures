import express from 'express';
import { getAllComments, imageUploadComments } from '../controller/commentController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllComments);
router.post('/imageupload', multerUpload.single("image"), imageUploadComments);

export default router;