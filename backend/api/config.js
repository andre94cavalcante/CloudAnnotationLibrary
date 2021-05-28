const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  BUCKET_NAME: process.env.BUCKET_NAME
};
