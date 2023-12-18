import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes)


app.post('/api/login', (req, res) => {

    console.log(req.body)
    res.send("login")
});

app.post('/api/signup', (req, res) => {

    console.log(req.body)
    res.send("signup")
});

app.listen(5000, () => console.log(`server is running on http://localhost:5000`));