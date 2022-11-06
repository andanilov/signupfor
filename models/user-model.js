const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  role: { type: String, default: 'user' },
  isActivated: { type: Boolean, default: false },
  registered: { type: Number, required: false },
  lastAction: { type: Number, required: false },
});

module.exports = model('User', UserSchema);
