import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/login', (req, res) => {

    console.log(req.body)
    res.send("he")
});

app.listen(5000, () => console.log(`server is running on http://localhost:5000`));