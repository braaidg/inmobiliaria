import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail } from "../helpers/emails.js";

const loginForm = (req, res) => {
  res.render("auth/login", {
    page: "Log in",
  });
};

const registerForm = (req, res) => {
  res.render("auth/register", {
    page: "Create account",
    csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
      user: {
        name,
        email,
      },
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    token: generateId(),
  });

  registerEmail({
    name: newUser.name,
    email: newUser.email,
    token: newUser.token,
  });

  res.render("templates/message", {
    page: "Account successfully created",
    message: "We sent you an confirmation email, click on the link ",
  });
};

const confirm = async (req, res, next) => {
  const { token } = req.params;

  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render("auth/confirm-account", {
      page: "Error at account confirmation",
      message: "There was an error trying to confirm your account, try again.",
      error: true,
    });
  }

  user.token = null;
  user.confirmed = true;
  await user.save();

  res.render("auth/confirm-account", {
    page: "Account confirmed",
    message: "Your account was successfully confirmed.",
  });
};

export { loginForm, registerForm, forgotPasswordForm, register, confirm };
