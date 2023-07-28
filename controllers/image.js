const Image = require("../models/image");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  GetObjectCommand,
  S3Client,
  paginateListObjectsV2,
} = require("@aws-sdk/client-s3");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const createImage = async (req, res) => {
  const { file } = req;
  const { gallery } = req.body;

  const newImage = await Image.create({
    name: file.filename,
    gallery,
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
// the addded part
// const getAllS3Files = async (client: S3Client, s3Opts) => {
//   const totalFiles = [];
//   for await (const data of paginateListObjectsV2({ client }, s3Opts)) {
//     totalFiles.push(...(data.Contents ?? []));
//   }
//   return totalFiles;
// };

// const main = async () => {
//   const client = new S3Client(s3Config);
//   const s3Opts = { Bucket: "bucketName" };
//   console.log(await getAllS3Files(client, s3Opts));
// };
//end of the added part
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

/* // For Deno
import {
  paginateListObjectsV2,
  S3Client,
  S3ClientConfig,
} from "https://deno.land/x/aws_sdk@v3.32.0-1/client-s3/mod.ts"; */
