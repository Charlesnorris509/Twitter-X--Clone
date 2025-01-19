const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Follow a user
router.post('/users/:id/follow', async (req, res) => {
    try {
        const userId = req.user.id;
        const userToFollow = await User.findById(req.params.id);
        if (!userToFollow) return res.status(404).json({ message: 'User not found' });

        const isFollowing = userToFollow.followers.includes(userId);
        if (isFollowing) return res.status(400).json({ message: 'Already following this user' });

        userToFollow.followers.push(userId);
        await userToFollow.save();

        const currentUser = await User.findById(userId);
        currentUser.following.push(userToFollow._id);
        await currentUser.save();

        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Unfollow a user
router.delete('/users/:id/unfollow', async (req, res) => {
    try {
        const userId = req.user.id;
        const userToUnfollow = await User.findById(req.params.id);
        if (!userToUnfollow) return res.status(404).json({ message: 'User not found' });

        userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.toString() !== userId);
        await userToUnfollow.save();

        const currentUser = await User.findById(userId);
        currentUser.following = currentUser.following.filter(following => following.toString() !== userToUnfollow._id.toString());
        await currentUser.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a list of followers for a user
router.get('/users/:id/followers', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.followers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a list of users followed by a user
router.get('/users/:id/following', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('following');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.following);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
