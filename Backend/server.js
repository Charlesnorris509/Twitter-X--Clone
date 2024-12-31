const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Database connection
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
