const { resolve } = require("@angular/compiler-cli/src/ngtsc/file_system");
const mongoose = require("mongoose");
const config = require("../api/config");
const userSchema = require("../models/user.model");
const notebookSchema = require("../models/notebook.model");
const hashJs = require("./../api/hash");

mongoose.set("useFindAndModify", false);

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

let sessionID = "";
let hashID = "";

const Notebook = mongoose.model("notebook", {
  projectName: {
    type: String,
  },
  author: {
    type: String,
  },
  subject: {
    type: String,
  },
  pages: {
    type: Number,
  },
  tags: [],
});

async function newNotebook(info) {
  const note = await new Notebook(info);
  // console.log("mongoose ID", login.sessionID);
  note.author = "60886644330b137eb3c72d66";
  note.pages = info.tempQueueImgs;
  note
    .save()
    .then((note) => {
      console.log("Created object in the DB:");
      console.log(note);
    })
    .catch((error) => {
      console.log("Error!", error);
    });
  return note;
}

async function findNotebook(info) {
  const note = await Notebook.find({
    projectName: info.projectName,
  }).then();
  if (note.length >= 1) {
    console.log("Found Notebook object in the DB:");
    console.log(note[0]);
    return note;
  } else {
    console.log("No Notebook with this name");
  }
}

async function updatePages(info) {
  const notebookImagesArr = await Notebook.find({
    projectName: info.projectName,
  });
  const note = await Notebook.update(
    {
      projectName: info.projectName,
    },
    {
      $set: { pages: info.pages },
    }
  );
}

const User = mongoose.model("user", {
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  url: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
  },
  follow: [],
});

async function newUser(info) {
  const user = await new User(info);
  user.isAdmin = false;
  user.follow = [];
  // user.password = await hashJs.createHash(info.password).then();
  user
    .save()
    .then((user) => {
      console.log("Created user in the DB:");
      console.log(user);
    })
    .catch((error) => {
      console.log("Error!", error);
    });
}

async function matchUserInfo(info) {
  const user = await User.find({
    email: info.email,
  }).then();
  if (user.length >= 1) {
    console.log("Found email in the DB:");
    console.log(user[0]);
    if (user[0].password === info.password) {
      console.log("Login Successful");
      sessionID = user[0]._id.toString();
      // hashID = await hashJs.createHash(sessionID).then();
      // console.log("Hash ID:", hashID);
      return sessionID;
    } else {
      console.log("Wrong Password");
      return "Senha Incorreta";
    }
  } else {
    console.log("Unregistered");
    return "E-mail não Cadastrado";
  }
}

module.exports = {
  newNotebook: newNotebook,
  findNotebook: findNotebook,
  updatePages: updatePages,
  newUser: newUser,
  matchUserInfo: matchUserInfo,
};
