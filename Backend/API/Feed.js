const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Retrieve the personalized news feed for the current user
router.get('/feed', async (req, res) => {
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

module.exports = router;
