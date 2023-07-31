const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const photographerRouter = require("./routes/photographers");
const clientRouter = require("./routes/client");
const galleryRouter = require("./routes/gallery");
const imageRouter = require("./routes/image");
const multer = require("multer");
require("./db.js");
const { errorHandler } = require("./middleswares/ErrorHandler");

const app = express();
const port = 8000;

//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is important to allow cookies in the request from other domains or ports
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/photographer", photographerRouter);
app.use("/client", clientRouter);
app.use("/gallery", galleryRouter);
app.use("/image", imageRouter);
app.use(errorHandler);

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
