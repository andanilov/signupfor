
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');

class UserController {
  async account (req, res, next) {
    try {
      return res.json({ content: 'account' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new UserController();
