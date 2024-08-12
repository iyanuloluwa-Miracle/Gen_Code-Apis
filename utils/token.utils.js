const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '9h' });
};

module.exports = {
  generateAccessToken,
};
