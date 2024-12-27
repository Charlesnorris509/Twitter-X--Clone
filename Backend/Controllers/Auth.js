const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// OAuth2.0 integration for Google
exports.oauthLogin = async (req, res) => {
    const { googleId, email, username } = req.body;

    try {
        let user = await User.findOne({ email });

        // If user doesn't exist, create a new one
        if (!user) {
            user = new User({ googleId, email, username });
            await user.save();
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'OAuth login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Get current user info
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

// Update profile info
exports.updateProfile = async (req, res) => {
    const updates = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select('-password');
        res.status(200).json({ message: 'Profile updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};
