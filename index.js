const express = require("express");
const cors = require("cors");
const photographerRouter = require("./routes/photographers");
const clientRouter = require("./routes/client");
const galleryRouter = require("./routes/gallery");
const imageRouter = require("./routes/image");
const multer = require("multer");

require("dotenv/config");
require("./db");

const app = express();
const port = 8000;

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/photographer", photographerRouter);
app.use("/client", clientRouter);
app.use("/gallery", galleryRouter);
app.use("/image", imageRouter);

//image upload error managing middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    res.status(400).send("Error uploading file: " + error.message);
  } else if (error) {
    res.status(400).send("Error: " + error.message);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ data: "Hello, World!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
