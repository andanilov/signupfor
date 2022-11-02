const { Schema, model } = require('mongoose');

const UserPasswordRequestShema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  link: { type: String, required: true },
  status: { type: Boolean, default: false },
  datetime: { type: Number, default: +new Date() },
  actor: { type: String, default: false }
});

module.exports = model('UserPasswordRequest', UserPasswordRequestShema);
