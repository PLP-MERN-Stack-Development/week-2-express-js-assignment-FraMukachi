const { UnauthorizedError } = require('../errors');

function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new UnauthorizedError();
  }
  next();
}

module.exports = authenticate;
