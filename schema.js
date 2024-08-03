const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userschema = mongoose.Schema({
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
});

// userschema.methods.genrateauthtoken = async function () {
//   try {
//     console.log(this._id);
//     const token = await jwt.sign(
//       { _id: this._id.toString() },
//       "mynameisvandan"
//     );
//     this.tokens[0].token = token;
//     await this.save();
//     return token;
//   } catch (e) {
//     console.log(e);
//   }
// };

const usermodel = new mongoose.model("account", userschema);
module.exports = usermodel;
