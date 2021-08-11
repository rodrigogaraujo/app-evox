import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.2.2:3333',
  // baseURL: 'http://165.22.39.129',
  baseURL: 'https://api.evoxfit.us',
});

export default api;
