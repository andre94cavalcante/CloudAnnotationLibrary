// const http = require('http')
// const express = require('express');
// const path = require('path');
// // const app = require('./backend/api/app')
// const nomeApp = process.env.npm_package_name;

// // Create PORT
// const port = process.env.PORT || 5000

// const app = express();

// app.set('port', port)
// const server = http.createServer(app)

// // Heroku settings

// app.use(express.static(`${__dirname}/dist/${nomeApp}`));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
// });

// app.listen(port, () => console.log('Server started on 5000'))

// module.exports = app


const http = require('http')
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session')

const imageUploader = require('./backend/api/imageUploader');
const infoUploader = require('./backend/api/infoUploader');
const api = require('./backend/api/app')

const nomeApp = process.env.npm_package_name;

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(cors());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}))

api(app);

app.use(express.static(`${__dirname}/dist/angular-node-file-upload`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/angular-node-file-upload/index.html`));
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}))



app.listen(port, () => console.log(`Server is listening on port ${port}!`));
