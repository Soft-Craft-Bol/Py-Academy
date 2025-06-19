import Cookies from 'js-cookie';

export const signOut = () => {
  Cookies.remove('authToken');
  Cookies.remove('userData');
  // window.location.href = '/login';
};

export const saveToken = (token) => {
  Cookies.set('authToken', token, { 
    expires: 1,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
  });
};

export const getToken = () => Cookies.get('authToken');

export const saveUser = (userData) => {
  Cookies.set('userData', JSON.stringify(userData), {
    expires: 1,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
  });
};

export const getUser = () => {
  try {
    const userDataString = Cookies.get('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};