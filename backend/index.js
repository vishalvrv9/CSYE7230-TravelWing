require('dotenv').config();
const { port, env } = require('./config/vars');
const app = require('./config/express');
const bcrypt = require('bcryptjs');
const mongoose = require('./config/mongoose');
const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');
const User = require('./models/userModel');
const authRoutes = require('./routes/auth/authRoutes');

// Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// connect to mongo db
mongoose.connect(process.env.MONGODB_URI);

// Use auth routes
app.use('/auth', authRoutes);


// listen to requests
app.listen(port, () => console.log(`Server started on port ${port} (${env})`));
 


module.exports = app;