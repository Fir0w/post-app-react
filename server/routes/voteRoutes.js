import express from 'express';
import { votePost, getVotes } from '../controllers/voteController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, votePost);
router.get('/', protect, getVotes);


export default router;