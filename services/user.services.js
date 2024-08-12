const User = require('../models/auth.model');

// Get all users
// const getAllUsers = async () => {
//   return await User.find({});
// };

// Get a user by ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// Update a user by ID
const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a user by ID
const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
};
