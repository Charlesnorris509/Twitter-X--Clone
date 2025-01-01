// middleware/errorHandlers.js

// 404 Not Found Handler
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

// Centralized Error Handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred',
  });
};

module.exports = { notFoundHandler, errorHandler };
