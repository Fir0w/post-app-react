const express = require('express');
const cors = require('cors')


const app = express();

// app.use(cors()) // Use this after the variable declaration

app.get('/api', (req, res) => {
    const responseData = {
        name: "benny",
        lastName: "firw",
        gender: "gg"
    }
    res.send(responseData)
});

app.listen(5000, () => console.log(`server is running on http://localhost:5000`));