import app from './app.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';


const port = process.env.PORT || 5000;

dotenv.config();

connectDB();

app.listen(port, () => console.log(`server is running on http://localhost:5000`));

export default app;