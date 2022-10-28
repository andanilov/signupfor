const { Schema, model } = require('mongoose');

const UserActiovationLinkShema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  link: { type: String, required: true },
  datetime: { type: Number, required: true },
});

module.exports = model('UserActivationLink', UserActiovationLinkShema);
