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

// const homePath =
//   process.env.HOME + "/Programming/TCC/Actual/backend/tempDownload/";
const homePath = "./backend/tempDownload/";

let arrFileNames = [];

async function downloadPdf(req, res) {
  let pages = req.body.pages;
  let id = req.body._id;
  let fileName = "";

  for (let i = 1; i <= pages; i++) {
    fileName = `${id}-${i}.jpg`;
    await getFilesFromAWS(fileName).then();
  }
  let pdfPath = await generatePDF(req.body.projectName).then();
  for (let i = 0; i < arrFileNames.length; i++) {
    const path = arrFileNames[i];
    console.log("path", path);
    await deleteFile(path).then();
  }
  arrFileNames = [];
  return pdfPath;
}

async function getFilesFromAWS(fileName) {
  try {
    console.log(fileName);
    const data = await s3
      .getObject({ Bucket: S3_BUCKET, Key: fileName })
      .promise();
    await saveTempFiles(`${homePath}${fileName}`, data.Body).then(() => {
      arrFileNames.push(`${homePath}${fileName}`);
    });
  } catch (err) {
    console.log("File missing.", fileName);
  }
}

async function saveTempFiles(name, buffer) {
  try {
    fs.writeFileSync(name, buffer);
  } catch (err) {
    console.log("Unable to save file:", name);
  }
}

async function generatePDF(projectName) {
  try {
    let pdfPath = `${homePath}${projectName}.pdf`;
    imagesToPdf(arrFileNames, pdfPath);
    console.log(pdfPath);
    return pdfPath;
  } catch (err) {
    console.log("Unable to save file:", `${projectName}.pdf`);
  }
}

async function deleteFile(path) {
  console.log(path);
  try {
    fs.unlink(path, () => {});
  } catch (err) {
    console.log("Unable to delete file:", path);
    console.log(err);
  }
}

// async function browserDownload(pdfPath, res) {
//   try {
//     res.attachment(pdfPath);
//     // let fileStream = s3.getObject(params).createReadStream();
//     // fileStream.pipe(res);
//   } catch (err) {
//     console.log("Unable to download PDF:", pdfPath);
//     console.log(err);
//   }
// }

module.exports = {
  downloadPdf: downloadPdf,
  deleteFile: deleteFile,
};
