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

async function downloadTest(res) {
  let params = {
    Key: "60d0e09a981b2abb52af74b6-1624303209595.jpg",
    Bucket: S3_BUCKET,
  };

  s3.getObject(params, function (err, data) {
    if (err) {
      throw err;
    }
    fs.writeFileSync(
      "./backend/tempDownload/60d0e09a981b2abb52af74b6-1624303209595.jpg",
      data.Body
    );
    console.log("file downloaded successfully");
  });

  // res.attachment("60d0e09a981b2abb52af74b6-1624303148816.jpg");
  // let fileStream = s3.getObject(params).createReadStream();
  // fileStream.pipe(res);

  // await imagesToPdf(
  //   ["path/to/image1.jpg", "path/to/image2.png"],
  //   "path/to/combined.pdf"
  // );
}

module.exports = {
  downloadTest: downloadTest,
};
