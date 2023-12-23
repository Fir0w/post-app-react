import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


app.listen(5000, () => console.log(`server is running on http://localhost:5000`));