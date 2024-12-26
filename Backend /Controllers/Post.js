const Post = require('../models/Post');
const User = require('../models/User');

// Create a Post
const createPost = async (req, res) => {
    const { content, mediaUrl } = req.body;

    try {
        // Create a new post
        const newPost = new Post({
            userId: req.user.id,
            content,
            mediaUrl,
            createdAt: new Date(),
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get All Posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username avatar');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get Posts for Specific User
const getUserPosts = async (req, res) => {
    const { userId } = req.params;

    try {
        const posts = await Post.find({ userId }).populate('userId', 'username avatar');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

module.exports = { createPost, getPosts, getUserPosts };
