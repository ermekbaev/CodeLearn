// В файле, где вы делаете API-запросы
import axios from 'axios';

// Настройка Axios для автоматической отправки токена
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});