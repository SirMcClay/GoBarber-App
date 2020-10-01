import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://10.0.2.2:3333', // Android Studio Emulator IP
  baseURL: 'https://nodedeploy.mmyapp.com',
});

export default api;
