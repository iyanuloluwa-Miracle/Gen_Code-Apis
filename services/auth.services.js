const argon2 = require('argon2');
const User = require('../models/auth.model');
const { generateAccessToken, generateResetToken, validateResetToken } = require('../utils/token.utils');
const { sendResetTokenByEmail } = require('../utils/emailService');

const signupUser = async (firstName, lastName, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password using Argon2
  const hashedPassword = await argon2.hash(password);

  // Create a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  await user.save();
  return user;
};

const signInUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the password using Argon2
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate the access token
  const accessToken = generateAccessToken(user);
  return { user, accessToken };
};

const forgotPassword = async (body) => {


  const { email } = body;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      error: "User not found",
      status: 404,
    };
  }

  const { token, hash } = await generateResetToken();
  user.resetToken = token;
  user.resetTokenHash = hash;
  user.resetTokenExpiry = Date.now() + 3600000; // Token expiry time (1 hour)
  await user.save();

  await sendResetTokenByEmail(user.email, token);

  return {
    success: true,
    data: { email: user.email },
    message: "Password reset email sent",
    status: 200,
  };
};

const resetPassword = async (email, resetToken, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // Validate the reset token
  if (!validateResetToken(user.resetTokenHash, resetToken)) {
    throw new Error("Invalid or expired reset token");
  }

  // Hash the new password
  const hashedPassword = await argon2.hash(newPassword);
  user.password = hashedPassword;
  user.resetToken = null; // Clear the reset token after use
  user.resetTokenHash = null; // Clear the reset token hash after use
  user.resetTokenExpiry = null;
  await user.save();

  return user;
};


module.exports = {
  signupUser,
  signInUser,
  forgotPassword,
  resetPassword  

};
