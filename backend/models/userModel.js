const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: function() { return new mongoose.Types.ObjectId() },
    unique: true,
    index: true
  },
  // uid: {  // This will store the Firebase UID
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  fname: {
    type: String,
    required: [true, 'First name is required']
  },
  lname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  provider: {
    type: String,
    required: false
  },
  myItineraries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Itinerary'
  }]
}, { timestamps: true });


// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;