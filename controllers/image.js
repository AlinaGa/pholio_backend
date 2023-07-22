const Image = require("../models/image");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const bucketName = process.env.BUCKET_NAME;

const createImage = async (req, res) => {
  const { file } = req;
  const { id, name } = req.body;
  const newImage = await Image.create({
    id,
    name,
  });
  res.json(newImage);
};

const getImage = async (req, res) => {
  const images = await Image.find();
  for (let image of images) {
    // For each image, generate a signed URL and save it to the image object
    image.imageUrl = await getSignedUrl(
      S3Client,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: image.imageName,
      }),
      { expiresIn: 3600 }
    );
  }

  res.send(images);
};

const deleteImage = async (req, res) => {};

module.exports = { createImage, getImage, deleteImage };
