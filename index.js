const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
require("./validation"); // Assuming you have a separate validation file
const usermodel = require("./schema");

const app = express();
const PORT = 4500;
const JWT_SECRET = "secreatkey"; // Use environment variables for sensitive info

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

// User Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid login details");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Invalid login details");
    } else {
      res.send("login succesfully");
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
    const newUser = await usermodel.insertMany({
      email: emailSignup,
      password: passwordHash,
      phonenumber: phone,
      age: age,
    });
    console.log(newUser);
    // Use save instead of insertMany
    return res.send("account created succesfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
