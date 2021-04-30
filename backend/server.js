const http = require('http')
const express = require('express');
const path = require('path');
const app = require('./api/app')
const nomeApp = process.env.npm_package_name;

// Create PORT
const port = process.env.PORT || 5000

app.set('port', port)
const server = http.createServer(app)

// Heroku settings

app.use(express.static(`${__dirname}/dist/${nomeApp}`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});


app.listen(port, () => console.log('Server started on 5000'))
