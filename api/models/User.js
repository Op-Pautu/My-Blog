const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 16,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
