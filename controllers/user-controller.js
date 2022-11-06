
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');
const authController = require('./auth-controller');

class UserController {
  async account (req, res, next) {
    try {
      return res.json({ content: 'account' });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getUser (req, res, next) {
    try {
      const actor = req?.user;
      const {
        sortCol = 'email',
        sortDirection = 1,
        limit = 100,
      } = req.query;
      const users = await userService.getUsers(actor, sortCol, sortDirection, limit);
      return res.json(users);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async removeUser (req, res, next) {
    try {
      const actor = req?.user;
      const _id = req?.params?._id;
      await userService.removeUser(actor, _id);
      return res.json();
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new UserController();
