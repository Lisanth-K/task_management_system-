import axios from 'axios';

// Create an Axios instance that handles both development and production base URLs correctly.
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    // Remove trailing slash if it exists in the env variable
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
    return `${apiUrl}/api/tasks`;
  }
  return '/api/tasks';
};

const API = axios.create({ baseURL: getBaseUrl() });

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
