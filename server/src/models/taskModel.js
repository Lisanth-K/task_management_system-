import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
    },
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
      required: [true, 'Please add a due date'],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Define Indexes for better query performance
// 1. Text index on title for efficient searching
taskSchema.index({ title: 'text' });

// 2. Compound index on status and dueDate for efficient filtering and sorting
taskSchema.index({ status: 1, dueDate: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
