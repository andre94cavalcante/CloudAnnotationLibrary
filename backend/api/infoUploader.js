const mongoose = require("../mongoDB/mongoose");
const imageUploader = require("./imageUploader");

async function getInfo(req, res) {
  console.log("Info received from frontend:");
  console.log(req.body);
  let note = await mongoose.findNotebook(req.body).then();
  if (note === undefined) {
    note = await mongoose.newNotebook(req.body).then();
  }
  console.log("ID of the Notebook: ", note._id);
  imageUploader.geNotebookInfo(note, req.body.tempQueueImgs);
}

module.exports = {
  getInfo: getInfo,
};
