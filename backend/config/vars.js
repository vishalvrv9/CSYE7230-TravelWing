const path = require('path');

const appPackage = require('../package.json');

require('dotenv').config();

module.exports = {
  appName: appPackage.name,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  chatgptKey: process.env.CHATGPT_KEY,
  uri: process.env.MONGODB_URI,
  api: process.env.MAILGUN_API_KEY
};