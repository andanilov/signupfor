const ApiError = require('../exceptions/api-error');
const UserModel = require('../models/user-model');
const UserActivationLink = require('../models/user-activation-link');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');
const mailService = require('../services/mail-service');
const userTokenService = require('../services/user-token-service');

class UserService {
  async registration (email, password, name) {
console.log('1');
    const applicant = await UserModel.findOne({ email });
    if (applicant) throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует!`);
console.log('2');
    const passwordHash = await bcrypt.hash(password, +process.env.PSWD_HASH_SALT);
    const user = await UserModel.create({ email, password: passwordHash, name });
console.log('3');
    const activationLink = uuid.v4();
    await UserActivationLink.create({ user_id: user._id, activationLink, datetime: +new Date() });
console.log('4');
    await mailService.sendActiovationMail(email, `${process.env.API_URL}${process.env.API_ROUTE}/activate/${activationLink}`);
console.log('5');
    const userDto = new UserDto(user);
    const tokens = await userTokenService.generateAndSavePairTokens(userDto);
console.log('6');
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
