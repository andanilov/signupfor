const { Schema, model } = require('mongoose');

const UserTokenShema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = model('UserToken', UserTokenShema);
