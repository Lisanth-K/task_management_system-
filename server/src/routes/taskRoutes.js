import express from 'express';
import {
  getTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Base route operations
router.route('/')
  .get(getTasks)
  .post(createTask);

// Statistics route (Must be defined before /:id to prevent 'stats' being evaluated as an ID)
router.route('/stats')
  .get(getTaskStats);

// Single resource operations
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router;
