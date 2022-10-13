// const multer = require("multer");
// const AWS = require("aws-sdk");
// const multerS3 = require("multer-s3");
// const path = require("path");
// AWS.config.loadFromPath(__dirname + '/../config/s3.json');
// const s3 = new AWS.S3();
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "wjwbucket",
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key(req, file, cb) {
//       cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
//     },
//   }),
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// module.exports = { upload };

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'wjwbucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
module.exports = upload;