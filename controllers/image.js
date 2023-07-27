const Image = require("../models/image");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const createImage = async (req, res) => {
  const { file } = req;
  const { client, name } = req.body;
  const newImage = await Image.create({
    name: file.filename,
    client,
  });
  res.json(newImage);
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
const getImage = async (req, res, next) => {
  const { gallery } = req.query;

  try {
    const images = await Image.find({ gallery });

    const result = [];
    for (let i = 6; i < images.length; i++) {
      const uploadParams = {
        Bucket: bucketName,
        Key: images[i].name,
      };
      const command = new GetObjectCommand(uploadParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      result.push({ name: images[i].name, url, _ìd: images[i]._ìd });
    }

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteImage = async (req, res) => {};

module.exports = { createImage, getImage, deleteImage };
