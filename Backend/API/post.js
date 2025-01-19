const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
router.post('/posts', async (req, res) => {
    try {
        const { userId, content, mediaUrl } = req.body;
        const newPost = new Post({ userId, content, mediaUrl });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve all posts for the current user and their connections
router.get('/posts', async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('following');
        const posts = await Post.find({
            userId: { $in: [userId, ...user.following.map(follow => follow._id)] }
        }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a specific post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like or unlike a post
router.post('/posts/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userId = req.user.id;
        const hasLiked = post.likes.some(like => like.userId.toString() === userId);

        if (hasLiked) {
            post.likes = post.likes.filter(like => like.userId.toString() !== userId);
        } else {
            post.likes.push({ userId });
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a comment to a post
router.post('/posts/:id/comment', async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments.push({ userId, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve comments for a specific post
router.get('/posts/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('comments.userId');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
