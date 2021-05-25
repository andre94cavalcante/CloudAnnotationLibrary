const mongoose = require('../mongoDB/mongoose')
const imageUploader = require('./imageUploader')

async function getInfo(req, res) {
  console.log('Info received from frontend:');
  console.log(req.body)
  const noteArr = await seeIfExists(req).then()
  let queueNumber = req.body.tempQueueImgs
  if (noteArr === undefined) {
    let note = await sendInfoToDB(req)
    let newPages = await quantityOfPagesToDB(queueNumber, note)
    imageUploader.getIdNotebook(note._id, newPages);
  } else {
    let id = noteArr[0]._id
    console.log('ID of the Notebook: ', id)
    let newPages = await quantityOfPagesToDB(queueNumber, noteArr[0])
    imageUploader.getIdNotebook(id, newPages);
  }
}

async function sendInfoToDB(req) {
  let note = await mongoose.newNotebook(req.body).then()
  return note
}

async function seeIfExists(req) {
  let noteArr = await mongoose.findNotebook({
    projectName: req.body.projectName
  }).then()
  return noteArr
}

async function quantityOfPagesToDB(queue, note) {
  // console.log(note.pages)
  note.pages += queue
  // console.log(note.pages)
  mongoose.updatePages(note)
  return note.pages
}

module.exports = {
  getInfo: getInfo,
}
