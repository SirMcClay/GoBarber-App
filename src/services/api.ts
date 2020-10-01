import axios from 'axios';
import { API_URL_PRODUCTION } from '../env';

const api = axios.create({
  baseURL: API_URL_PRODUCTION,
});

export default api;
