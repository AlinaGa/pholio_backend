const express = require('express');
const multer = require('multer');
const cors = require('cors');
require("dotenv/config");
require("./db");
const app = express();
const port = 8008;

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ data: "Hello, World!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

