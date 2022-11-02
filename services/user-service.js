const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');
const UserActivationLinkModel = require('../models/user-activation-link');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');
const mailService = require('../services/mail-service');
const userTokenService = require('../services/user-token-service');
const UserPasswordRequestModel = require('../models/user-password-request-model');
const routes = require('../router/routes');
const generatePassword = require('password-generator');
const getPeriodByString = require('../utils/getPeriodByString');

class UserService {
  async registration (email, password, name) {
    const applicant = await UserModel.findOne({ email });
    if (applicant) throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует!`);
    const passwordHash = await bcrypt.hash(password, +process.env.PSWD_HASH_SALT);
    const user = await UserModel.create({ email, password: passwordHash, name });
    const activationLink = uuid.v4();
    await UserActivationLinkModel.create({ user_id: user._id, activationLink, datetime: +new Date() });
    await mailService.sendActiovationMail(email, `${process.env.API_URL}${process.env.API_ROUTE}/activate/${activationLink}`); 
    return await this._getUserDtoAndTokens(user);
  }

  async login (email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) throw ApiError.BadRequest(`Пользователь не найден или данные не верные!`);
    const arePasswordSame = await bcrypt.compare(password, user.password);
    if (!arePasswordSame) throw ApiError.BadRequest(`Пользователь не найден или данные не верные!`);
    return await this._getUserDtoAndTokens(user);
  }

  async logout (refreshToken) {
    return await userTokenService.deleteRefreshToken(refreshToken); 
  }

  async refresh (refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();
    const token = await userTokenService.checkIfRefreshTokenExists(refreshToken);
    if (!token) throw ApiError.BadRequest();
    const isTokenGood = userTokenService.validateRefreshToken(token?.refreshToken);
    if (!isTokenGood) throw ApiError.UnauthorizedError();
    const user = await UserModel.findById(token?.user_id);
    return await this._getUserDtoAndTokens(user);
  }

  async remember (email, actor = '') {
    if (!email) throw ApiError.BadRequest();
    const user = await UserModel.findOne({ email });
    if (!user) throw ApiError.BadRequest();
    const link = uuid.v4();
    await UserPasswordRequestModel.create({ user_id: user._id, link, actor });
    return mailService.sendResetPasswordLinkMail(email, `${process.env.API_URL}${process.env.API_ROUTE}${routes.remember}/${link}`, actor);
  }

  async activate (activationLink) {
    if (!activationLink) throw ApiError.BadRequest();
    const link = await UserActivationLinkModel.findOne({ activationLink });
    if (!link) throw ApiError.BadRequest();
    const user = await UserModel.findById(link.user_id);    
    if (!user || user.isActivated) throw ApiError.BadRequest();
    user.isActivated = true;
    return await user.save();
  }

  async resetPassword (link) {
    if (!link) throw ApiError.BadRequest();
    const userRequest = await UserPasswordRequestModel.findOne({ link });
    if (userRequest.status || (userRequest.datetime + getPeriodByString(process.env.PSWD_LINK_ALIVE) < +new Date())) throw ApiError.BadRequest();
    const user = await UserModel.findById(userRequest.user_id);
    if (!user) throw ApiError.BadRequest();
    const password = generatePassword(12, false);
    const passwordHash = await bcrypt.hash(password, +process.env.PSWD_HASH_SALT);
    await mailService.sendNewPasswordMail(user.email, password);
    user.password = passwordHash;
    await user.save();
    return new UserDto(user);
  }

  async redact (actor, name, password) {
    if (!actor) throw ApiError.BadRequest();
    const user = await UserModel.findById(actor._id);
    if (!user) throw ApiError.BadRequest();
    if (password) user.password = await bcrypt.hash(password, +process.env.PSWD_HASH_SALT);
    user.name = name;
    await user.save();
    return new UserDto(user);
  }

  async _getUserDtoAndTokens(user) {
    const userDto = new UserDto(user);
    const tokens = await userTokenService.generateAndSavePairTokens(userDto);
    return { ...tokens, user: userDto };  
  }
}

module.exports = new UserService();
