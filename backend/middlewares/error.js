const httpStatus = require('http-status');
const { isCelebrateError } = require('celebrate');
const { map } = require('lodash');
const APIError = require('../utils/APIError');
const { env } = require('../config/vars');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
  res.end();
};
exports.handler = handler;

/**
 * If error is Validation Error, convert it.
 * @public
 */
exports.validationError = (err, req, res, next) => {
  // If this isn't a Celebrate error, send it to the next error handler
  if (!isCelebrateError(err)) {
    return next(err);
  }
  const error = new APIError({
    message: 'Validation Error',
    errors: err.details,
    status: httpStatus.BAD_REQUEST,
  });

  return handler(error, req, res);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.converter = (err, req, res, next) => {
  let convertedError = err;

  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};