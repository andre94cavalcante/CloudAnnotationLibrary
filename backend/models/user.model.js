const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
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

mongoose.model("User", userSchema);
