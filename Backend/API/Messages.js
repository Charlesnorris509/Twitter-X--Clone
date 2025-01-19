const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

// Send a direct message
router.post('/messages', async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const newMessage = new Message({ senderId, receiverId, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve messages for the current user
router.get('/messages', async (req, res) => {
    try {
        const userId = req.user.id;
        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }]
        }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
