const express = require('express');
const routes = require('../routes');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');


/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
// @HACK: increase the size of request payload
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());


// mount routes
app.use(routes);


module.exports = app;