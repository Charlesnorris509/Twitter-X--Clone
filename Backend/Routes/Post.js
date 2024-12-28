const express = require('express');
const router = express.Router();
const {
  createPost,
  getPostById,
  getTimeline,
  getUserPosts,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
  deletePost,
  editPost,
} = require('../controllers/post');
const authMiddleware = require('../middleware/auth');

// Create a new post (requires authentication)
router.post('/', authMiddleware, createPost);

// Get a single post by ID
router.get('/:postId', getPostById);

// Get timeline posts for the authenticated user (requires authentication)
router.get('/timeline', authMiddleware, getTimeline);

// Get posts from a specific user
router.get('/user/:userId', getUserPosts);

// Like a post (requires authentication)
router.put('/:postId/like', authMiddleware, likePost);

// Unlike a post (requires authentication)
router.put('/:postId/unlike', authMiddleware, unlikePost);

// Add a comment to a post (requires authentication)
router.post('/:postId/comment', authMiddleware, commentPost);

// Delete a specific comment (requires authentication and ownership)
router.delete('/:postId/comment/:commentId', authMiddleware, deleteComment);

// Edit a post (requires authentication and ownership)
router.put('/:postId/edit', authMiddleware, editPost);

// Delete a post (requires authentication and ownership)
router.delete('/:postId', authMiddleware, deletePost);

module.exports = router;
