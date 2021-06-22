const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const info = {
  previousHash: "null1",
  result: "null",
};

async function createHash(data) {
  await bcrypt.genSalt(4).then((salt) => {
    info.previousHash = bcrypt.hash(data, salt).then((hash) => {
      return hash;
    });
  });
  return info.previousHash;
}

async function confirmHash(data, previousHash) {
  bcrypt.compare(data, previousHash).then((result) => {
    info.result = result;
    console.log(result);
  });
  return info.result;
}

module.exports = {
  createHash: createHash,
  confirmHash: confirmHash,
};
