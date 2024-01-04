import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import voteRoutes from './routes/voteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/posts/vote', voteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);


app.listen(5000, () => console.log(`server is running on http://localhost:5000`));