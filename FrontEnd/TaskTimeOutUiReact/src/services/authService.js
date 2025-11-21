import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const login = (username, password) => {
  return axios
    .post(`${API_URL}/signin`, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('jwt_token', response.data.accessToken);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('jwt_token');
};

const isLoggedIn = () => {
  return !!localStorage.getItem('jwt_token');
};

const getToken = () => {
  return localStorage.getItem('jwt_token');
};

const authService = {
  login,
  logout,
  isLoggedIn,
  getToken,
};

export default authService;
