import express from 'express';
import { deleteUser, getAllUsers, getProfile, getUserById, imageUploadUser, loginUser, registerUser, updateUserInfo } from '../controller/userController.js';
import jwtAuth from '../tools/jwtAuth.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/all', getAllUsers);
router.get('/user', getUserById);
router.get('/profile', jwtAuth, getProfile);
router.post('/register', registerUser);
router.post('/upload', updateUserInfo);
router.post('/login', loginUser);
router.post('/delete', deleteUser);
router.post('/imageupload', multerUpload.single("image"), imageUploadUser);

export default router;