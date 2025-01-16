const express = require('express');
const router = express.Router();
const {
  register,
  login,
  oauthLogin,
  getProfile,
  updateProfile,
  recoverPassword,
  resetPassword
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

// Password recovery
router.post('/recover-password', recoverPassword);

// Reset password
router.post('/reset-password', resetPassword);

module.exports = router;
