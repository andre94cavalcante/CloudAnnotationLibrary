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
const pdfDownloader = require("./pdfDownloader");
const infoUploader = require("./infoUploader");
const login = require("./login");
const register = require("./register");
const search = require("./search");

let promiseID = "null";
let resultRegistration = "null";
let promiseFoundNotesArr = "null";
let pdfPath = "";

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
  app.post("http://tcc-andre.herokuapp.com/api/login", (req, res) => {
    promiseID = login.fetchUserInfo(req, res);
  });

  //Send ID Hash
  app.get("http://tcc-andre.herokuapp.com/api/login", (req, res) => {
    promiseID.then((id) => {
      res.send({
        msg: id,
      });
    });
  });

  // Upload Registration Info
  app.post("/api/register", (req, res) => {
    resultRegistration = register.createUser(req, res);
  });

  // Receive Confirmation Register
  app.get("/api/register", (req, res) => {
    resultRegistration.then((confirmation) => {
      res.send(confirmation);
    });
  });

  // Test Download AWS
  app.post("/api/download", (req, res) => {
    pdfPath = pdfDownloader.downloadPdf(req);
  });

  // Receive PDF
  app.get("/api/download", (req, res) => {
    pdfPath.then((path) => {
      res.download(path);
    });
  });

  //Delete Temp PDF
  app.post("/api/download/done", (req, res) => {
    pdfPath.then((path) => {
      pdfDownloader.deleteFile(path);
      res.end();
    });
  });

  //Search keyword in DB
  app.post("/api/search", (req, res) => {
    promiseFoundNotesArr = search.searchkeyword(req, res);
  });

  // Receive results from keyword Search
  app.get("/api/search", (req, res) => {
    promiseFoundNotesArr.then((arrNotes) => {
      res.send(arrNotes);
    });
  });
};
