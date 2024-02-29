// In ./config/mongoose.js
const mongoose = require('mongoose');

module.exports.connect = (uri) => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.error('MongoDB connection error:', err));

  return mongoose.connection;
};
