import axios from 'axios';

const instance = axios.create({
  timeout: '60000'
});

instance.interceptors.request.use(function(config) {
  if(config.method === 'post') {
    const { token } = window.localStorage;
    token && (config.headers.token = token);
  }
  return config;
});

instance.interceptors.response.use(function(response) {
  return response?.data;
});

export default instance;