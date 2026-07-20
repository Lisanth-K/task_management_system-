import axios from 'axios';

// Base URL for API requests. 
// Vite proxy forwards `/api` to `http://localhost:5000` in dev mode.
const API_URL = '/api/tasks';

export const fetchTasks = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const fetchTaskStats = async () => {
  const response = await axios.get(`${API_URL}/stats`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
