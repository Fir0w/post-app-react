import express from 'express';
import { createPost, getPost, deletePost } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, createPost);
router.get('/', protect, getPost);
router.delete('/', protect, deletePost);


export default router;