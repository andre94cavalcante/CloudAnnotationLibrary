const {
  resolve
} = require('@angular/compiler-cli/src/ngtsc/file_system')
const mongoose = require('mongoose')
const {
  connectableObservableDescriptor
} = require('rxjs/internal/observable/ConnectableObservable')
const {
  find
} = require('tslint/lib/utils')

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://eu:tycbpOzsxq8BpLzl@noteslibrary.9qkuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
// mongoose.connect('mongodb://127.0.0.1:27017/tcc', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

const Notebook = mongoose.model('notebook', {
  projectName: {
    type: String
  },
  author: {
    type: String
  },
  subject: {
    type: String
  },
  pages: {
    type: Number
  },
  tags: [],
})

async function newNotebook(info) {
  const note = await new Notebook(info)
  note.author = '60886644330b137eb3c72d66'
  note.pages = info.tempQueueImgs
  note.save().then((note) => {
    console.log('Created object in the DB:')
    console.log(note)
  }).catch((error) => {
    console.log('Error!', error)
  })
  return note
}

async function findNotebook(info) {
  const note = await Notebook.find({
    projectName: info.projectName
  }).then()
  if (note.length >= 1) {
    console.log('Found Notebook object in the DB:')
    console.log(note[0])
    return note
  } else {
    console.log('No Notebook with this name')
  }
}

async function updatePages(info) {
  const note = await Notebook.findOneAndUpdate({
    projectName: info.projectName
  }, {
    pages: info.pages
  })
}

module.exports = {
  newNotebook: newNotebook,
  findNotebook: findNotebook,
  updatePages: updatePages
}
