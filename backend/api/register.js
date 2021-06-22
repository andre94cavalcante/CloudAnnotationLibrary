const mongoose = require("../mongoDB/mongoose");
const app = require("../../server");
const http = require("http");
const express = require("express");

const port = process.env.PORT || "http://localhost:5000";

async function createUser(req, res) {
  console.log("Info received from frontend:");
  console.log(req.body);
  const userExists = await mongoose.matchUserInfo(req.body).then();
  if (userExists === "E-mail não Cadastrado") {
    await mongoose.newUser(req.body).then();
    return true;
  } else {
    console.log("User already exists");
    return false;
  }
}

module.exports = {
  createUser: createUser,
};
