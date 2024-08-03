require("dotenv").config();
const jwt = require("jsonwebtoken");
const usermodel = require("../schema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(`this is token ${token}`);
    const verifyuser = jwt.verify(token, process.env.SECREAT_KEY);
    console.log(verifyuser);
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
