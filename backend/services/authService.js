const bcrypt = require('bcryptjs');
const admin = require('firebase-admin');
const User = require('../models/userModel');

const createUser = async ( email, password, fname, lname) => {
  // const userResponse = await admin.auth().createUser({
  //   email,
  //   password,
  //   emailVerified: false,
  //   disabled: false,
  // });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    // uid: userResponse.uid,
    email,
    password: hashedPassword,
    fname,
    lname,
  });

  console.log("Hello fresh newUser ", newUser);

  await newUser.save();
  return { newUser};
};

const loginUser = async ({ email, password }) => {
  console.log("Hello loginUser - before finding email in service ", email, password);
  const user = await User.findOne({ email });
  console.log("Hello loginUser - after finding email in service ", user);
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
 
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  console.log("Hello loginUser - after validating both email and password in service ", user.email, user.password);
  // const userResponse = {
  //   fname: user.fname,
  //   lname: user.lname,
  //   email: user.email,
  //   // Include other fields you want to return
  // };
  return {user};
};

const googleSignIn = async (user) => {
  // Hash a dummy password
  const dummyPassword = await bcrypt.hash('googleSignUpDummyPassword', 10);
  
  const newUser = new User({
    email: user.email,
    fname: user.displayName,
    lname: user.displayName,
    password: dummyPassword,
    provider: 'google',
    uid: user.uid
  });
  const newUserString = JSON.stringify(newUser);

  console.log("hello google user ", newUserString);

  await newUser.save();
  return { newUser };
};

const facebookSignIn = async (user) => {
  const newUser = new User({
    email: user.email,
    fname: user.displayName,
    lname: user.displayName,
    password: 'do not need password in mongoDB for fb sign in.',
    provider: 'fb'
  });

  await newUser.save();
  return { newUser };
}

const getUserDetailsById = async (email) => {
  try {
    console.log("Inside getUserDetailsById services");
    const user = await User.findOne({ email: email });
    console.log("Hello user in getUser ", user);
    if (!user) {
      throw new Error('User not found');
    }
    return user;  // Return user directly instead of using res.json
  } catch (error) {
    throw new Error('Server error', error.message);  // Throw an error to be handled by the caller
  }
}


module.exports = {
  createUser, loginUser, googleSignIn, facebookSignIn, getUserDetailsById
};
