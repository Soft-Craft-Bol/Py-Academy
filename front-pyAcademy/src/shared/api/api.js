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

//Autentificacion y Registro
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

//Simulador de codigo
export const executeCode = (data) => api.post('/execute', data);

//Ejercicios
export const createExercises = (data) => api.post('/exercises', data);

// Subir recursos para cursos
export const createLearningMaterial = (data) => api.post('/learning/materials', data);

//course
export const inscribirseCurso = (data) => api.post('/courses/enrollments', data);
export const getCourseByStudent = (studentId) =>
  api.get(`/courses/enrollments/student/${studentId}`);
export const getCoursesByTeacher = (teacherId) =>
  api.get(`/courses/enrollments/teacher/${teacherId}`);
export const getCourseUnits = (courseId) => api.get(`/learning/units/course/${courseId}`);
export const getStudentByCourse = (courseId) =>
  api.get(`/courses/enrollments/${courseId}/students`);
export const getUserDetails = (userId) => api.get(`/users/${userId}`);

export const createCourse = (formData) => {
  return api.post('/courses', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllCourses = (page = 0, size = 10) => {
  return api.get('/courses/all', {
    params: {
      page: page,
      size: size,
    },
  });
};

export const createUnits = (data) => api.post('/learning/composite/create', data);
export const getTeacherCourses = (teacherId) => api.get(`/teachers/${teacherId}/courses`);
export const getExercises = () => api.get(`/exercises`);

export const fetchUnitsByCourse = (courseId) => {
  // Verificar que courseId sea válido
  if (!courseId || isNaN(courseId)) {
    return Promise.reject('Invalid course ID');
  }
  return api.get(`/learning/units/course/${courseId}`);
};


export const getMaterialsByUnit = (unitId) =>
  api.get(`/learning/materials/unit/${unitId}`);
