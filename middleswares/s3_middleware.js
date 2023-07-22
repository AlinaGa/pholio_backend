const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

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

const uploadFile = async (req, res, next) => {
  const { file } = req;
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Key: file.filename,
    Body: fileStream,
    contentType: file.mimetype,
  };
  const command = new PutObjectCommand(uploadParams);

  try {
    await s3.send(command);

    next();
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("File upload failed");
  }
};
module.exports = uploadFile;
