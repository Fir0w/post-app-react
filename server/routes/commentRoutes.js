import express from 'express';
import { createComment, getComment, deleteComment } from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, createComment);
router.get('/', protect, getComment);
router.delete('/', protect, deleteComment);


export default router;