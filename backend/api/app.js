const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
const app = require('../../server')
// const nomeApp = process.env.npm_package_name;
const imageUploader = require('./imageUploader');
const infoUploader = require('./infoUploader');

//--------------------------------------------------------------------------------------------------------

// Express settings
// const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Header', 'Origin, X-Reqquested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

//--------------------------------------------------------------------------------------------------------

// // Heroku settings

// app.use(express.static(`${__dirname}/dist/${nomeApp}`));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
// });

//--------------------------------------------------------------------------------------------------------

// Image Upload Functions
app.get('/api', (req, res) => {
  imageUploader.fileCatcher(res);
});

// POST Image File
app.post('/api/imgUpload', imageUploader.upload.single('image'), function (req, res) {
  imageUploader.imageUpload(req, res);
});

//--------------------------------------------------------------------------------------------------------

// Upload Info Notebook
app.post('/api/infoUpload', (req, res, next) => {
  infoUploader.getInfo(req, res)
  // next()
});

// // Send Notebook`s ID to name the img file
// app.use('/api/infoUpload', (req, res, next) => {
//   res.status(200).json([{
//     id: infoUploader.id
//   }])
// })

//--------------------------------------------------------------------------------------------------------

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

//--------------------------------------------------------------------------------------------------------

// module.exports = app
