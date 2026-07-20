/**
 * Async Handler Wrapper
 * Wraps async route handlers to automatically catch exceptions
 * and pass them to the global error handler middleware.
 * This eliminates the need for try/catch blocks in every controller.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
