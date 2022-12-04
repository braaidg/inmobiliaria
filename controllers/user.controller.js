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

export { loginForm, registerForm, forgotPasswordForm };
