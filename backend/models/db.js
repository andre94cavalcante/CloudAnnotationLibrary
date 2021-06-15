const mongoose = require("mongoose");
const config = require("../api/config");

mongoose.set("useFindAndModify", false);

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
