const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    const { newUser } = await authService.createUser( email, password, fname, lname);
    res.status(200).send( { newUser });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
};

const signin = async (req, res) => {
    try {
        console.log("Is it coming here? - Hello signin ", req.body);
        console.log("Is it coming here? - Hello signin in controller - email ", req.body.email);
        const user = await authService.loginUser(req.body);
        res.status(200).send({ message: 'Login Successful', user: user });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        // For other errors
        res.status(500).send({ message: 'Error logging in', error: error.message });
    }
}

const googleSignIn = async (req, res) => { 
  try {
    console.log("Is it coming here? - Hello googleSignIn ", req.body);
    const { newUser } = await authService.googleSignIn(req.body);
    res.status(200).send( { newUser });
  } catch (error) {
    console.error('Google Signup error:', error);
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }

}

const getUserDetailsById = async (req, res) => {
  try {
    console.log("Inside getUserDetailsById controller");
    const user = await authService.getUserDetailsById(req.params.email);
    res.status(200).send({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send({ message: 'Error fetching user details', error: error.message });
  }
};

module.exports = {
  signup, signin, googleSignIn, getUserDetailsById
};
