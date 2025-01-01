const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const notificationRoutes = require('./routes/notification');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandlers');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors({ origin: process.env.CORS_ORIGIN })); // Enable CORS
app.use(morgan('dev')); // Logging requests in development mode

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running!' });
});

// Register Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/posts', postRoutes); // Post routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/notifications', notificationRoutes); // Notifications

// Catch-All Route for Undefined Endpoints
app.all('*', notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
