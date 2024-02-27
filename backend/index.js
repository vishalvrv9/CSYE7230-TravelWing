const { port, env, uri } = require('./config/vars');
const app = require('./config/express');
// const mongoose = require('./config/mongoose');


// open mongoose connection
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connection successful'))
//   .catch((err) => console.error('MongoDB connection error:', err));


// listen to requests
app.listen(port, () => console.log(`Server started on port ${port} (${env})`));
 


module.exports = app;