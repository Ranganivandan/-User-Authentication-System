require("dotenv").config();
const jwt = require("jsonwebtoken");
const usermodel = require("../schema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(`this is token ${token}`);
    const verifyuser = jwt.verify(token, process.env.SECREAT_KEY);
    console.log(verifyuser);
    const user = await usermodel.findOne({ _id: verifyuser._id });
    console.log(user);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.send("<h1>First Login And Then Try Again</h1>");
  }
};
module.exports = auth;
