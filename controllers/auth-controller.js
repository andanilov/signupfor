
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const userService = require('../services/user-service');
const cookieService = require('../services/cookie-service');
const getRemoteClientInfo = require('../utils/getRemoteClientInfo');
const noticeClientRedirect = require('../notice/notice-client-redirect');

class AuthController {
  async registration (req, res, next) {
    try {
      const errorValidate = validationResult(req);
      if (!errorValidate.isEmpty()) throw ApiError('Неверные данные', errorValidate);
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, password, name);
      cookieService.setRefreshToken(res, userData.refreshToken);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async activate (req, res, next) {
    try {
      const activationLink = req.params?.activationLink;
      await userService.activate(activationLink);
      return noticeClientRedirect(res, 'user_activation');
    } catch (e) {
      console.log(e);
      return noticeClientRedirect(res, 'user_activation_fault');
      // next(e);
    }
  }

  async login (req, res, next) {
    try {
      const errorValidate = validationResult(req);
      if (!errorValidate.isEmpty()) throw ApiError('Неверные данные', errorValidate);
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      cookieService.setRefreshToken(res, userData.refreshToken);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async logout (req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      cookieService.deleteRefreshToken(res);
      return res.json();
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async remember (req, res, next) {
    try {
      const { email } = req.body;      
      const actor = getRemoteClientInfo(req);
      await userService.remember(email, actor);
      return res.json({});
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async resetPassword (req, res, next) {
    try {
      const link = req.params?.link;
      await userService.resetPassword(link);   
      return noticeClientRedirect(res, 'user_password_changed');
    } catch (e) {
      return noticeClientRedirect(res, 'user_password_changed_fault');
    }
  }

  async refresh (req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      cookieService.setRefreshToken(res, userData.refreshToken);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async redact (req, res, next) {
    try {
      const user = req?.user;
      const { name, password } = req.body;
      const userData = await userService.redact(user, name, password);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = new AuthController();
