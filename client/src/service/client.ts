import axios from 'axios';

export default function axiosClient() {
  const api = axios.create({
    baseURL: 'https://ajudai-api.onrender.com',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return api;
}
