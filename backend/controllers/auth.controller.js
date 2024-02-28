const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const { email, password, fname, lname } = req.body;
    const userResponse = await authService.createUser(email, password, fname, lname);
    res.status(200).send(userResponse);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
};

const signin = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body);
        res.status(200).send({ message: 'Login Successful', user: 'user' });
    } catch (error) {
        if (error.message === 'User not found' || error.message === 'Invalid password') {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        // For other errors
        res.status(500).send({ message: 'Error logging in', error: error.message });
    }
}

module.exports = {
  signup, signin
};
