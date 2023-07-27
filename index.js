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
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const app = express();
const port = 8000;

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.get("/test", async (req, res) => {
//   const imageFiles = "2_tn.jpg";

//   try {
//     const imageUrls = await Promise.all(
//       imageFiles.map(async (imageFiles) => {
//         const uploadParams = {
//           Bucket: bucketName,
//           Key: imageFiles,
//         };

//         const command = new GetObjectCommand(uploadParams);

//         const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

//         return url;
//       })
//     );

//     res.send(imageUrls);
//   } catch (err) {
//     console.log("Error", err);
//     res.status(500).send("An error occurred while fetching images.");
//   }
// });

app.get("/test", async (req, res) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: "2_tn.jpg",
  };

  const command = new GetObjectCommand(uploadParams);

  try {
    // const { Body } = await s3.send(command);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.send(url);
  } catch (err) {
    console.log("Error", err);
  }
});

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
