import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const userApi = {
  createUser: (data: { name: string; username: string }) => 
    api.post('/api/users/create', data),
};


