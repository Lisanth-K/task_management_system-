/**
 * Middleware to handle requests to undefined routes (404 Not Found)
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler Middleware
 * Catches all errors thrown in the application and formats the JSON response
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found (Invalid ID format)';
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
