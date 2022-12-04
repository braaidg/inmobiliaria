import express from "express";
import {
  loginForm,
  registerForm,
  forgotPasswordForm,
  register,
  confirm,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/login", loginForm);

router.get("/register", registerForm);
router.post("/register", register);

router.get("/email-confirmation/:token", confirm);

router.get("/forgot-password", forgotPasswordForm);

export default router;
