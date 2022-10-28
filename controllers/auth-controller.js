
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');

class AuthController {
  async test (req, res, next) {
    try {
      console.log('!!!', process.env.CLIENT_URL);
      res.end(`<h1>SignUpFor App! (${process.env.CLIENT_URL})</h1>`);
    } catch (e) {
      next(e);
    }
  }

  async registration (req, res, next) {
    try {
      const errorValidate = validationResult(req);
      if (!errorValidate.isEmpty()) throw ApiError('Неверные данные', errorValidate);
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, password, name);
      console.log(userData, email, password, name);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new AuthController();
