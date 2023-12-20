import express from "express";
import { post, get } from '../controllers/postController.js';

const router = express.Router();

router.post('/', post);
router.get('/', get);

export default router;