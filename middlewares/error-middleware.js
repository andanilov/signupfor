const ApiError = require('../exceptions/api-error');

module.exports = function errorMiddleware(err, req, res, next) {
  return err instanceof ApiError
    ? res.status(err.status).json({ message: err.message, ...err.errors })
    : res.status(500).json({ message: 'Server Error!' });
}
