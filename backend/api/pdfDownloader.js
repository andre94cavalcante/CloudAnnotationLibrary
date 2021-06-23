const fs = require("fs"),
  AWS = require("aws-sdk"),
  imagesToPdf = require("images-to-pdf");
const configAWS = require("./config");

// AWS Info
AWS.config.update({
  secretAccessKey: configAWS.AWS_SECRET_ACCESS_KEY,
  accessKeyId: configAWS.AWS_ACCESS_KEY,
  region: configAWS.AWS_DEFAULT_REGION,
});

S3_BUCKET = configAWS.BUCKET_NAME;
const s3 = new AWS.S3();

const homePath =
  process.env.HOME + "/Programming/TCC/Actual/backend/tempDownload/";

async function downloadPdf(req, res) {
  let arrFiles = await getImgFiles(req).then();
  // setTimeout(() => {
  //   generatePDF(arrFiles, req.body.projectName);
  // }, 10000);

  // console.log(arrFiles);
  // let pdfPath = await generatePDF(arrFiles, req.body.projectName).then();

  // for (let i = 1; i <= arrFiles.length; i++) {
  //   const path = arrFiles[i];
  //   deleteFile(path);
  // }
  // deleteFile(pdfPath);
}

async function getImgFiles(req) {
  let pages = req.body.pages;
  let arrImgFiles = [];
  let fileName = "";
  for (let i = 1; i <= pages; i++) {
    fileName = `${req.body._id}-${i}.jpg`;
    arrImgFiles.push(fileName);
    let params = {
      Key: fileName,
      Bucket: S3_BUCKET,
    };
    s3.getObject(params, function (err, data) {
      if (err) {
        console.log("File missing", i);
      }
      fs.writeFileSync(`${homePath}${arrImgFiles[i]}`, data.Body);
    });
  }
  console.log(arrImgFiles);
  return arrImgFiles;
}

async function generatePDF(arr, name) {
  let pdfPath = `${homePath}${name}.pdf`;
  imagesToPdf(arr, pdfPath);
  return pdfPath;
}

const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

// res.attachment("60d0e09a981b2abb52af74b6-1624303148816.jpg");
// let fileStream = s3.getObject(params).createReadStream();
// fileStream.pipe(res);

// await imagesToPdf(
//   ["path/to/image1.jpg", "path/to/image2.png"],
//   "path/to/combined.pdf"
// );

module.exports = {
  downloadPdf: downloadPdf,
};
