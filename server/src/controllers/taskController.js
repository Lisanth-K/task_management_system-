import Task from '../models/taskModel.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Get all tasks with optional search, filter, and sorting
// @route   GET /api/tasks
// @access  Public
export const getTasks = asyncHandler(async (req, res) => {
  const { search, status, sortBy, order } = req.query;

  let query = {};

  // 1. Search by title using regex for partial, case-insensitive match
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  // 2. Filter by status
  if (status && status !== 'All') {
    query.status = status;
  }

  // Build the initial Mongoose query
  let mongooseQuery = Task.find(query);

  // 3. Sorting
  if (sortBy) {
    const sortOrder = order === 'desc' ? -1 : 1;
    mongooseQuery = mongooseQuery.sort({ [sortBy]: sortOrder });
  } else {
    // Default sort by creation date (newest first)
    mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
  }

  // Execute query
  const tasks = await mongooseQuery;

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Public
export const getTaskStats = asyncHandler(async (req, res) => {
  // Aggregate stats using countDocuments
  const totalTasks = await Task.countDocuments();
  const pendingTasks = await Task.countDocuments({ status: 'Pending' });
  const completedTasks = await Task.countDocuments({ status: 'Completed' });

  res.status(200).json({
    success: true,
    data: {
      totalTasks,
      pendingTasks,
      completedTasks,
    },
  });
});

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
export const createTask = asyncHandler(async (req, res) => {
  // Mongoose schema validation will automatically handle missing fields
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update task (complete or partial)
// @route   PUT /api/tasks/:id
// @access  Public
export const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Update and return the new document, ensuring validations run on the updated fields
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Task successfully deleted.',
  });
});
