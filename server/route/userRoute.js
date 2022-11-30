import express from 'express';
import { getAllUsers, imageUploadUser, registerUser } from '../controller/userController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllUsers);
router.post('/register', registerUser);
router.post('/imageupload', multerUpload.single("image"), imageUploadUser);

export default router;