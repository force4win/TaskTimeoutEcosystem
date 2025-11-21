import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8081/api/tasktimeout/tasks';

const getAuthHeaders = () => {
  const token = authService.getToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

const getTasks = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

const createTask = (task) => {
  return axios.post(API_URL, task, { headers: getAuthHeaders() });
};

const updateTask = (id, task) => {
  return axios.put(`${API_URL}/${id}`, task, { headers: getAuthHeaders() });
};

const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
