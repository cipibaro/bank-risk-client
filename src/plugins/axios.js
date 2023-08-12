// axios-config.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  maxBodyLength: Infinity,
});

export default instance;
