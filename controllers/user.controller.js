const authService = require('../services/user.services');

// Get all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await authService.getAllUsers();
//     res.status(200).json({
//       success: true,
//       data: users,
//       message: 'Users retrieved successfully',
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       data: null,
//       error: err.message,
//       message: 'Server Error',
//     });
//   }
// };

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await authService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Server Error',
    });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await authService.updateUserById(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Server Error',
    });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await authService.deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'User not found',
      });
    }
    res.status(200).json({
      success: true,
      data: null,
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Server Error',
    });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  deleteUserById,
};
