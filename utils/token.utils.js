const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const argon2 = require('argon2');


const hashFunction = async (data) => {
  try {
    return await argon2.hash(data, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,   // 64 MB memory
      timeCost: 3,           // 3 iterations
      parallelism: 4,        // 4 parallel threads
    });
  } catch (err) {
    console.error("Error hashing data:", err);
    throw new Error("Hashing failed");
  }
};

const generateResetToken = async () => {
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const hash = await hashFunction(token);
  return { token, hash };
};

const validateResetToken = async (storedHash, token) => {
  try {
    return await argon2.verify(storedHash, token);
  } catch (err) {
    throw new Error("Token validation failed");
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '9h' });
};

module.exports = {
  generateAccessToken,
  generateResetToken,
  validateResetToken

};
