import express from 'express';
import { authUser, registerUser, logoutUser, updateAvatar, getUser } from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.put('/updateAvatar', protect, updateAvatar);
router.get('/user', getUser);



export default router;