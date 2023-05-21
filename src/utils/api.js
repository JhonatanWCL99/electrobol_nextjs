import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Reemplaza con la URL de tu API de NestJS
});

export default api;
