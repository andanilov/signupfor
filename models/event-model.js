const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: false },
  start: { type: Number, required: true },
  period: { type: Number, required: true },
  participant: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('User', UserSchema);
