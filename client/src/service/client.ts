import axios from 'axios';

export default function axiosClient() {
  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
  return api;
}
