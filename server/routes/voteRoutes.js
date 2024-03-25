import express from 'express';
import { postVote, getVotes } from '../controllers/voteController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, postVote);
router.get('/', protect, getVotes);


export default router;