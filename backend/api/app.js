// const express = require('express'),
//   path = require('path'),
//   cors = require('cors'),
//   multer = require('multer'),
//   bodyParser = require('body-parser');
// const app = require('../../server')
// // const nomeApp = process.env.npm_package_name;
// const imageUploader = require('./imageUploader');
// const infoUploader = require('./infoUploader');

// //--------------------------------------------------------------------------------------------------------

// // Express settings
// // const app = express();
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Header', 'Origin, X-Reqquested-With, Content-Type, Accept')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
//   next()
// })

// //--------------------------------------------------------------------------------------------------------

// // // Heroku settings

// // app.use(express.static(`${__dirname}/dist/${nomeApp}`));

// // app.get('/*', (req, res) => {
// //   res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
// // });

// //--------------------------------------------------------------------------------------------------------

// // Image Upload Functions
// app.get('/api', (req, res) => {
//   imageUploader.fileCatcher(res);
// });

// // POST Image File
// app.post('/api/imgUpload', imageUploader.upload.single('image'), function (req, res) {
//   imageUploader.imageUpload(req, res);
// });

// //--------------------------------------------------------------------------------------------------------

// // Upload Info Notebook
// app.post('/api/infoUpload', (req, res, next) => {
//   infoUploader.getInfo(req, res)
//   // next()
// });

// // // Send Notebook`s ID to name the img file
// // app.use('/api/infoUpload', (req, res, next) => {
// //   res.status(200).json([{
// //     id: infoUploader.id
// //   }])
// // })

// //--------------------------------------------------------------------------------------------------------

// // Find 404 and hand over to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res, next) => {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });

// //--------------------------------------------------------------------------------------------------------

// // module.exports = app

const imageUploader = require("./imageUploader");
const pdfDownloaer = require("./pdfDownloader");
const infoUploader = require("./infoUploader");
const login = require("./login");
const register = require("./register");

let promiseID = "null";
let resultRegistration = "null";

const configAWS = require("./config"),
  fs = require("fs"),
  AWS = require("aws-sdk");

// AWS Info
AWS.config.update({
  secretAccessKey: configAWS.AWS_SECRET_ACCESS_KEY,
  accessKeyId: configAWS.AWS_ACCESS_KEY,
  region: configAWS.AWS_DEFAULT_REGION,
});

S3_BUCKET = configAWS.BUCKET_NAME;
const s3 = new AWS.S3();

module.exports = (app) => {
  // Image Upload Functions
  app.get("/api", (req, res) => {
    res.send("You did not say the magic word");
  });

  // POST Image File
  // app.post('/api/imgUpload', imageUploader.uploadLocal.single('image'), function (req, res) {
  //   imageUploader.imageUpload(req, res);
  // });

  app.post(
    "/api/imgUpload",
    imageUploader.uploadAWS.single("image"),
    function (req, res) {
      imageUploader.imageUpload(req, res);
    }
  );

  // Upload Info Notebook
  app.post("/api/infoUpload", (req, res, next) => {
    infoUploader.getInfo(req, res);
  });

  // Get Login Info
  app.post("/api/users", (req, res) => {
    promiseID = login.fetchUserInfo(req, res).then();
  });

  //Express Session
  app.get("/userID", (req, res) => {
    promiseID.then((id) => {
      res.send({
        msg: id,
      });
    });
  });

  // Upload Info User
  app.post("/api/register", (req, res) => {
    resultRegistration = register.createUser(req, res);
  });

  // Test Download AWS
  app.get("/download", (req, res) => {
    pdfDownloaer.downloadTest(res);
  });

  app.post("/api/search", (req, res) => {
    console.log(req.body);
  });
};
