const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  phonenumber: {
    type: Number,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

userschema.methods.genrateauthtoken = async function () {
  try {
    console.log(this._id);
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECREAT_KEY,
      {
        expiresIn: "1h",
      }
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};

const usermodel = new mongoose.model("account", userschema);
module.exports = usermodel;
