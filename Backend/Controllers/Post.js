const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
    const { content, mediaUrl, hashtags } = req.body;

    try {
        const newPost = new Post({
            userId: req.user.userId,
            content,
            mediaUrl,
            hashtags,
        });

        await newPost.save();

        res.status(201).json({ message: 'Post created successfully.', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Get all posts for the current user and their connections
exports.getTimeline = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        // Get posts from the user and their following list
        const posts = await Post.find({
            userId: { $in: [user._id, ...user.following.map((follow) => follow.userId)] },
        })
            .sort({ createdAt: -1 })
            .populate('userId', 'username avatar');

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Toggle like
        const isLiked = post.likes.some((like) => like.userId.toString() === req.user.userId);
        if (isLiked) {
            post.likes = post.likes.filter((like) => like.userId.toString() !== req.user.userId);
        } else {
            post.likes.push({ userId: req.user.userId });
        }

        await post.save();

        res.status(200).json({ message: isLiked ? 'Post unliked.' : 'Post liked.', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Add a comment to a post
exports.commentPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        post.comments.push({ userId: req.user.userId, content });

        await post.save();

        res.status(201).json({ message: 'Comment added.', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post || post.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized or post not found.' });
        }

        await post.remove();

        res.status(200).json({ message: 'Post deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
