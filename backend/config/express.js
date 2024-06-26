const express = require('express');
const routes = require('../routes');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const error = require('../middlewares/error');


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
app.use(cors({ 
    origin: 'http://travelwing.online:3000', // Adjust this to match the domain of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed request methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
 

// mount routes
app.use(routes);


app.use(error.validationError);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;