const mongoose = require('../mongoDB/mongoose');
const app = require('../../server');
const http = require('http')
const express = require('express');

const port = process.env.PORT || 'http://localhost:5000';

async function fetchUserInfo(req, res) {
  let authorizedId = await mongoose.matchUserInfo(req.body).then()
  http.get(port + '/api/users', {
    id: authorizedId
  })
}

module.exports = {
  fetchUserInfo: fetchUserInfo,
}
