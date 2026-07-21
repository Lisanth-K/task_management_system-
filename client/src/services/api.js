import axios from 'axios';

// Create an Axios instance that handles both development and production base URLs correctly.
// In development, the Vite proxy handles `/api/tasks` requests.
// In production, it uses VITE_API_URL from your .env file and appends `/api/tasks`.
const baseURL = import.meta.env.PROD 
  ? `${import.meta.env.VITE_API_URL}/api/tasks`
  : '/api/tasks';

const API = axios.create({ baseURL });

export const fetchTasks = async (params) => {
  const response = await API.get('', { params });
  return response.data;
};

export const fetchTaskStats = async () => {
  const response = await API.get('/stats');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post('', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await API.put(`/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
