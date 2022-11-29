import express from 'express';
import { getAllUsers, registerUser } from '../controller/userController.js';


const router = express.Router();

router.get('/all', getAllUsers);
router.post('/register', registerUser);

export default router;