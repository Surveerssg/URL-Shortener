const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

async function handleUserSignup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", { error: errors.array()[0].msg });
  }
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("login", { error: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};