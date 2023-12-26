import express from 'express';
import { post, get, Delete } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, post);
router.get('/', protect, get);
router.delete('/', protect, Delete);

export default router;