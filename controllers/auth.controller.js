require("../models/database");
const authService = require('../services/auth.services');
const { userRegistrationSchema, userLoginSchema, resetPasswordSchema } = require('../validators/auth.validator');

const signupUser = async (req, res) => {
  const { error } = userRegistrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: error.details[0].message,
      message: "Validation error",
    });
  }

  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await authService.signupUser(firstName, lastName, email, password);
    res.status(201).json({
      success: true,
      data: user,
      message: "User registration successful 😎",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: "User registration failed",
    });
  }
};

const signInUser = async (req, res) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: error.details[0].message,
      message: "Validation error",
    });
  }

  try {
    const { email, password } = req.body;
    const { user, accessToken } = await authService.signInUser(email, password);
    res.status(200).json({
      success: true,
      data: { user, accessToken },
      error: null,
      message: "Login successful 🎉",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Server Error',
    });
  }
};

const logout = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "Log out successful!",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

const forgotPassword = async (req, res, next) => {
  try {
    const response = await authService.forgotPassword(req.body);
    res.status(response.status).json(response);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        error: error.details[0].message,
        message: "Password reset failed",
      });
    }

    const { email, resetToken, newPassword } = req.body;
    const user = await authService.resetPassword(email, resetToken, newPassword);

    res.status(200).json({
      success: true,
      data: { email: user.email },
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};



module.exports = {
  signupUser,
  signInUser,
  logout,
  forgotPassword,
  resetPassword
};
