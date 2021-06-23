const mongoose = require("../mongoDB/mongoose");

async function searchkeyword(req, res) {
  notesArr = await mongoose.findKeyword(req.body).then();
  return notesArr;
}

module.exports = {
  searchkeyword: searchkeyword,
};
