const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

let myPreviousHash = "null";
let myResult = "null";

async function createHash(data) {
  await bcrypt.genSalt(12).then((salt) => {
    bcrypt.hash(data, salt).then((hash) => {
      myPreviousHash = hash;
      // console.log(salt);
      // console.log(hash);
    });

    console.log(myPreviousHash);

    return myPreviousHash;
  });
}

async function confirmHash(data, previousHash) {
  bcrypt.compare(data, previousHash).then((result) => {
    myResult = result;
    console.log(result);
  });
  return myResult;
}

module.exports = {
  createHash: createHash,
  confirmHash: confirmHash,
};
