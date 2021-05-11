const express = require('express'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
const {
  consoleTestResultHandler
} = require('tslint/lib/test');
const mongoose = require('../mongoDB/mongoose');

// File upload settings
const path = process.env.HOME + '/Programming/TCC/Actual/backend/uploads';

const fileInfo = {
  idNotebook: 'NoFetch',
  numPages: 0,
  tempQueue: 0
}

const getIdNotebook = (id, pages, queue) => {
  fileInfo.idNotebook = id
  fileInfo.numPages = pages
  fileInfo.tempQueue = queue
}

let counter = 0
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let extension = '.' + file.originalname.split('.').pop()
    if (extension === '.jpeg') {
      extension = '.jpg'
    }
    setTimeout(() => {
      counter++
      console.log('counter: ', counter)
      let pageNum = fileInfo.numPages + counter
      cb(null, fileInfo.idNotebook + '-' + pageNum + extension)
    }, 200)
  }
});

let upload = multer({
  storage: storage
});


const fileCatcher = (res) => {
  res.end('File catcher')
}

const imageUpload = (req, res) => {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
}

module.exports = {
  upload: upload,
  fileCatcher: fileCatcher,
  imageUpload: imageUpload,
  getIdNotebook: getIdNotebook
}
