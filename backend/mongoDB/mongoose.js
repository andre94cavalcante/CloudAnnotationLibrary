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
  note.author = sessionID;
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
  const arrNotes = await Notebook.find({
    projectName: info.projectName,
    author: sessionID,
  }).then();
  if (arrNotes.length >= 1) {
    let note = arrNotes[0];
    console.log("Found Notebook object in the DB:");
    console.log(note);
    let newPages = note.pages + info.tempQueueImgs;
    await Notebook.updateOne(
      {
        _id: note._id,
      },
      {
        $set: { pages: newPages },
      }
    ).then();
    note = await Notebook.findOne({
      _id: note._id,
    }).then();
    console.log("Notebook with pages updated:");
    console.log(note);
    return note;
  } else {
    console.log("No Notebook with this name");
    return undefined;
  }
}

async function findKeyword(info) {
  const arrProjectName = await Notebook.find({
    projectName: { $regex: info.keywordSearch },
  }).then();
  const arrSubject = await Notebook.find({
    subject: { $regex: info.keywordSearch },
  }).then();
  const arrTags = await Notebook.find({
    tags: { $regex: info.keywordSearch },
  }).then();
  let arrSearchs = [arrProjectName, arrSubject, arrTags];
  let arrNotebooks = [];
  (() => {
    for (i = 0; i < arrSearchs.length; i++) {
      arrSearchs[i].map((note) => {
        arrNotebooks.push(note);
      });
    }
  })();
  if (arrNotebooks.length >= 1) {
    console.log("Keyword found in the DB:");
    console.log(arrNotebooks);
    return arrNotebooks;
  } else {
    console.log("No Notebook with this Keyword");
    return undefined;
  }
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
      return "Dados Incorretos";
    }
  } else {
    console.log("Unregistered");
    return "Dados Incorretos";
  }
}

module.exports = {
  newNotebook: newNotebook,
  findNotebook: findNotebook,
  findKeyword: findKeyword,
  newUser: newUser,
  matchUserInfo: matchUserInfo,
};
