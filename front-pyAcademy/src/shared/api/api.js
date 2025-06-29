import axios from 'axios';

const baseURL = 'http://localhost:8888/api/v1';

const api = axios.create({
  baseURL: baseURL,
  responseType: 'json',
  withCredentials: true,
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const loginUser = (data) => api.post('/auth/log-in', data);
export const addUser = (formData) => {
  return api.post('/auth/sign-up', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const saludo = (nombre = 'Usuario') =>
  api.get('/saludo', {
    params: { nombre },
  });

export const executeCode = (data) => api.post('/execute', data);

export const createExercises = (data) => api.post('/exercises', data);


//course
export const inscribirseCurso = (data) => api.post('/courses/enrollments', data);

//create course
//http://localhost:8888/api/v1/courses?teacherId=1
export const createCourse = (formData) => {
  return api.post('/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
