import express from 'express';
import { deleteUser, getAllUsers, getProfile, getUserById, imageDeleteUser, imageUploadUser, loginUser, registerUser, updateUserInfo } from '../controller/userController.js';
import jwtAuth from '../tools/jwtAuth.js';
import multerUpload from '../tools/multer.js';
import { body } from "express-validator";


const router = express.Router();

const validation = [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('email').not().isEmpty().withMessage('Email is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6, max: 10 }).withMessage('Invalid password'),
    body('password').custom((val, { req }) => {
        if (val !== req.body.password_confirmation) { throw new Error("Passwords don't match");
        } else { return req.body.password }}),
]

router.get('/all', getAllUsers);
router.get('/user', getUserById);
router.get('/profile', jwtAuth, getProfile);
router.post('/register', validation, registerUser);
router.post('/update', updateUserInfo);
router.post('/login', loginUser);
router.post('/delete', deleteUser);
router.post('/imageupload', multerUpload.single("image"), imageUploadUser);
router.post('/imagedelete', imageDeleteUser);

export default router;