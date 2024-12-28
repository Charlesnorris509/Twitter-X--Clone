const express = require('express');
const router = express.Router();
const {
  register,
  login,
  oauthLogin,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  deleteAccount,
} = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// User registration
router.post('/register', register);

// User login with username/password
router.post('/login', login);

// OAuth login
router.post('/oauth-login', oauthLogin);

// Get current user profile (requires authentication)
router.get('/profile', authMiddleware, getProfile);

// Update user profile (requires authentication)
router.put('/profile', authMiddleware, updateProfile);

// Change user password (requires authentication)
router.put('/change-password', authMiddleware, changePassword);

// Logout user (requires authentication)
router.post('/logout', authMiddleware, logout);

// Delete user account (requires authentication)
router.delete('/delete-account', authMiddleware, deleteAccount);

module.exports = router;
