import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/login', (req, res) => {

    console.log(req.body)
    res.send("he")
});

app.listen(5000, () => console.log(`server is running on http://localhost:5000`));