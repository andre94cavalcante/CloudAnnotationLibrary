const mongoose = require("../mongoDB/mongoose");
const imageUploader = require("./imageUploader");

async function getInfo(req, res) {
  console.log("Info received from frontend:");
  console.log(req.body);
  const noteArr = await mongoose
    .findNotebook({
      projectName: req.body.projectName,
    })
    .then();
  if (noteArr === undefined) {
    let note = await mongoose.newNotebook(req.body).then();
  } else {
    let id = noteArr[0]._id;
    console.log("ID of the Notebook: ", id);
    imageUploader.getIdNotebook(id);
  }
}

module.exports = {
  getInfo: getInfo,
};
