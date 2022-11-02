const { Schema, model } = require('mongoose');

const UserActiovationLinkShema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  activationLink: { type: String, required: true },
  datetime: { type: Number, default: +new Date() },
});

module.exports = model('UserActivationLinkModel', UserActiovationLinkShema);
