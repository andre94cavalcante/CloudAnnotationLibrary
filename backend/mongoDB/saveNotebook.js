const {
  MongoClient,
  ObjectID
} = require('mongodb')

const noteInfo = require('../api/infoUploader')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'tcc'

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }

  const db = client.db(databaseName)

  app.post('/api/infoUpload', (req, res, noteInfo) => {
    db.collection('notebooks').insertOne({
      name: noteInfo.name,
      // author: new ObjectID('604676038d7b22ad5f290277'),
      // subject: info.subject,
      tags: noteInfo.tags,
      // votes: []
    }).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
    console.log('new Notebook rolando')
  });

  // db.collection('notebooks').find({}).toArray().then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // db.collection('notebooks').deleteOne({}).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })
})

module.exports = {
  // newNotebook: this.newNotebook,
}
