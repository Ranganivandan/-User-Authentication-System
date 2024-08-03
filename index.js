require("dotenv").config();
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("./validation"); // Assuming you have a separate validation file
const usermodel = require("./schema");
const cookieparser = require("cookie-parser");
const { read } = require("fs");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieparser());
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html")); // Sends signin.html as a static file
});
app.get("/screat", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "secreat.html")); // Sends signin.html as a static file
});
app.get("/logout", auth, async function (req, res) {
  try {
    // Clear the token from the user's tokens array
    req.user.tokens = req.user.tokens.filter((currentElement) => {
      return currentElement.token != req.token;
    });
    // await req.user.save();

    // req.user.tokens = [];
    res.clearCookie("jwt");
    await req.user.save();
    console.log("Logout successfully");
    res.send("Logout successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid login details");
    }
    const token = await user.genrateauthtoken();
    // console.log(token);
    const cookies = res.cookie("jwt", token, {
      expires: new Date(Date.now() + 300000),
      httpOnly: true,
    });
    // console.log(cookies);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid login details");
    } else {
      res.send("<h1>Login succesfully</h1>");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// User Registration Route
app.post("/register", async (req, res) => {
  try {
    const { emailSignup, passwordSignup, phone, age } = req.body;

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email: emailSignup });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }

    const passwordHash = await bcrypt.hash(passwordSignup, 10);
    const newUser = new usermodel({
      email: emailSignup,
      password: passwordHash,
      phonenumber: phone,
      age: age,
    });
    const result = await newUser.save();
    console.log(result);
    // Use save instead of insertMany
    return res.send("<h1>account created succesfully</h1>");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
