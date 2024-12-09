const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello" })
})

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`)
})
