import { check, validationResult } from "express-validator";
import User from "../models/User.js";

const loginForm = (req, res) => {
  res.render("auth/login", {
    page: "Log in",
  });
};

const registerForm = (req, res) => {
  res.render("auth/register", {
    page: "Create account",
  });
};

const forgotPasswordForm = (req, res) => {
  res.render("auth/forgot-password", {
    page: "Recover your access to Real Estate",
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  await check("name").notEmpty().withMessage("Name cannot be empty").run(req);
  await check("email").isEmail().withMessage("Email is not valid").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Passsword must be at least 6 characters long")
    .run(req);
  await check("repeat_password")
    .equals(password)
    .withMessage("Passsword doesn't match")
    .run(req);

  let results = validationResult(req);

  if (!results.isEmpty()) {
    return res.render("auth/register", {
      page: "Create account",
      errors: results.array(),
      user: {
        name,
        email,
      },
    });
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return res.render("auth/register", {
      page: "Create account",
      errors: [{ msg: "User is already registered" }],
      user: {
        name,
        email,
      },
    });
  }

  const newUser = await User.create({ name, email, password, token: 123 });
  res.json(newUser);
};

export { loginForm, registerForm, forgotPasswordForm, register };
