const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_PW,
  region: "ap-northeast-2",
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "96hoonbucket",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { upload };