const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
  },

  password: {
    type: String,
    minLength: 8,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    require: true,
  },
  history: {
    type: Array,
    required: false,
  }

  // history: [
  //   {
  //     name: {
  //       type: String,
  //       required: false,
  //     },
  //     day: {
  //       type: String,
  //       required: false,
  //     },
  //     location: {
  //       type: String,
  //       required: false,
  //     },
  //     type: {
  //       type: String,
  //       required: false,
  //     },
  //     cinema: {
  //       type: String,
  //       required: false,
  //     },
  //     site: {
  //       type: String,
  //       required: false,
  //     },
  //     time: {
  //       type: String,
  //       required: false,
  //     },
  //     position: {
  //       type: String,
  //       required: false,
  //     },
  //     type_chair: {
  //       type: String,
  //       required: false,
  //     },
  //   }
  // ]
});

UserSchema.methods.checkPassword = function (password) {
  // return bcrypt.compareSync(password, this.password);
  return password === this.password;
};

UserSchema.methods.genToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

module.exports = mongoose.model("user", UserSchema);
