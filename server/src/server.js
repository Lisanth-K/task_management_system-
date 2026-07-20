import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON payloads

// Mount routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use(notFound); // Handle 404
app.use(errorHandler); // Global error handler

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
