const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  handleUserSignup
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  handleUserLogin
);

module.exports = router;