const multer = require("multer"),
  bodyparser = require("body-parser"),
  fs = require("fs"),
  AWS = require("aws-sdk"),
  multerS3 = require("multer-s3");
const mongoose = require("../mongoDB/mongoose");
const configAWS = require("./config");

// AWS Info
AWS.config.update({
  secretAccessKey: configAWS.AWS_SECRET_ACCESS_KEY,
  accessKeyId: configAWS.AWS_ACCESS_KEY,
  region: configAWS.AWS_DEFAULT_REGION,
});

S3_BUCKET = configAWS.BUCKET_NAME;
const s3 = new AWS.S3();

// File upload settings
const path = process.env.HOME + "/Programming/TCC/Actual/backend/uploads";

const fileInfo = {
  notebook: "NoFetch",
  newPages: "",
  i: 1,
};

const geNotebookInfo = (note, newPages) => {
  fileInfo.notebook = note;
  fileInfo.newPages = newPages;
};

const fileNameFunc = (file) => {
  let extension = file.originalname.split(".").pop();
  if (extension === "jpeg") {
    extension = "jpg";
  }
  let page = fileInfo.notebook.pages - fileInfo.newPages + fileInfo.i;
  const fileName = fileInfo.notebook._id + "-" + page + "." + extension;
  console.log(page);
  fileInfo.i++;
  if (fileInfo.i > fileInfo.newPages) {
    fileInfo.i = 1;
  }
  return fileName;
};

let uploadAWS = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    key: function (req, file, cb) {
      setTimeout(() => {
        cb(null, fileNameFunc(file));
      }, 700);
    },
  }),
});

const imageUpload = (req, res) => {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false,
    });
  } else {
    console.log("File is available!");
    return res.send({
      success: true,
    });
  }
};

// let uploadLocal = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path);
//     },
//     filename: (req, file, cb) => {
//       setTimeout(() => {
//         cb(null, fileNameFunc(file));
//       }, 500);
//     },
//   }),
// });

module.exports = {
  uploadAWS: uploadAWS,
  imageUpload: imageUpload,
  geNotebookInfo: geNotebookInfo,
  // uploadLocal: uploadLocal,
};
