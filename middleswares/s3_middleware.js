const fs = require("fs");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv/config");

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

const uploadFile = async (req, res) => {
  const { file } = req;
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Key: file.filename,
    Body: fileStream,
  };
  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);
};
module.exports = uploadFile;
