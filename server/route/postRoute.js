import express from 'express';
import { deletePost, favPost, getPostById, getPostsByAuthor, getPostsCity, getPostsUbahn, imageUploadPosts, likePost, removeFav, removeLike, sharePost, updatePost } from '../controller/postController.js';
import multerUpload from '../tools/multer.js';


const router = express.Router();

router.get('/ubahn', getPostsUbahn);
router.get('/city', getPostsCity);
router.get('/personal', getPostsByAuthor);
router.get('/personal', getPostById);
router.post('/share', sharePost);
router.post('/delete', deletePost)
router.post('/update', updatePost);
router.post('/imageupload', multerUpload.single("image"), imageUploadPosts);
router.post('/favourites', favPost);
router.post('/remove', removeFav);
router.post('/likes', likePost);
router.post('/removelike', removeLike);

export default router;