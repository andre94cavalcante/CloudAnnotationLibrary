const mongoose = require("../mongoDB/mongoose");
// const session = require("express-session");
const fetch = require("node-fetch");

const port = process.env.PORT || "http://localhost:5000";

let sessionID = "null";

async function fetchUserInfo(req, res) {
  console.log("Info received from frontend");
  console.log(req.body);
  await mongoose.matchUserInfo(req.body).then((id) => {
    sessionID = id.toString();
  });
  return sessionID;
}

module.exports = {
  fetchUserInfo: fetchUserInfo,
  sessionID: sessionID,
};
