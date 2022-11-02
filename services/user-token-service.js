const jwt = require('jsonwebtoken');
const userTokenModel = require('../models/user-token-model');

class UserTokenService {
  generatePairTokens(payload) { // payload - data for tokens
    return {
      accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_ALIVE }),
      refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_ALIVE }),
    }
  }

  async saveRefreshTokenToDB(user_id, refreshToken) {
    // 1. Check if refresh token allready exists for the userId
    const tokenData = await userTokenModel.findOne({ user_id });
    // 2. If old refresh token exists to update it
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    // 3. Create refresh token for the user
    const token = await userTokenModel.create({ user_id, refreshToken });
    return token;
  }

  async deleteRefreshToken(refreshToken) {
    // Try to delete refresh token if exists
    return await userTokenModel.deleteOne({ refreshToken });
  }

  async checkIfRefreshTokenExists(refreshToken) {
    return await userTokenModel.findOne({ refreshToken });
  }

  validateAccsessToken = (accessToken) => jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

  validateRefreshToken = (refreshToken) => jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  
  async generateAndSavePairTokens(userDto) {
    const tokens = this.generatePairTokens({ ...userDto }); 
    await this.saveRefreshTokenToDB(userDto._id, tokens.refreshToken);    
    return tokens;
  }
}

module.exports = new UserTokenService();
