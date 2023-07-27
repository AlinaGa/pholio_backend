const express = require("express");
require("dotenv/config");
const cors = require("cors");
const photographerRouter = require("./routes2/photographers");
// const clientRouter = require("./routes/client");
// const galleryRouter = require("./routes/gallery");
// const multer = require("multer");


const app = express();
const port = 8000;

//Middlewares
app.use(cors());
app.use(express.json());

app.use("/photographers", photographerRouter);

// app.use("/client", clientRouter);
// app.use("/gallery", galleryRouter);

app.get("/", (req, res) => {
  res.status(200).json({ data: "Hello, World!" });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
