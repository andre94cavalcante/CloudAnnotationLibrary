const mongoose = require("mongoose");

let notebookSchema = new mongoose.Schema({
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

mongoose.model("Notebook", notebookSchema);
