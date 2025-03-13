// import axios from 'axios';
// import { useNavigate } from 'react-router';

// // Создаем кастомный экземпляр axios
// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/', 
//   headers: {
//     'Content-Type': 'application/json', 
//   },
// });

// // interceptor for auto adding token 
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // interceptor for collecting errors and refresh tokens
// api.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const refreshToken = localStorage.getItem('refresh_token');
    
//     // Если ошибка 403 (например, CSRF) или 401
//     if ([401, 403].includes(error.response?.status) && !originalRequest._retry && refreshToken) {
//       originalRequest._retry = true;
      
//       try {
//         // Обновляем access token

//         const response = await axios.post('/token/refresh/', { refresh: refreshToken });
//         localStorage.setItem('log', response.data);
//         localStorage.setItem('access_token', response.data.access);
//         localStorage.setItem('refresh_token', response.data.refresh);

//         // Повторяем запрос с новым токеном
//         // originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
//         // return api(originalRequest);
//       } catch (err) {
//         // Если обновление не удалось, разлогиниваем
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/login';
//       }
//     }
    
//     // return Promise.reject(error);
//   }
// );

// export default api;