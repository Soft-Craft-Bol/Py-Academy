//React
//assets
import React from 'react';
import { useNavigate } from 'react-router-dom';


import loginImage from '@/assets/img/LoginImage.webp';

//Components
import LoginForm from '@/features/auth/components/LoginForm';

import { useAuth } from '@/app/context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = React.useState('');

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      navigate('/student'); // O "/dashboard" según tu estructura
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <main className="flex flex-1 max-w-7xl mx-auto px-4 sm:px-8 items-center justify-center gap-12 flex-col lg:flex-row py-16">
        {/* Imagen Terminal */}
        <div className="w-full max-w-md rounded-lg overflow-hidden lg:max-w-lg dark:shadow-yellow-500/50 shadow-xl transition-transform duration-300 ease-in-out">
          <img src={loginImage} alt="Imagen login" className="w-full h-auto object-cover" />
        </div>

        <section
          className="bg-white rounded-2xl p-8 sm:p-10 w-full max-w-lg dark:bg-gradient-1 dark:shadow-blue-500/50 shadow-xl transition-transform duration-300 ease-in-out"
          aria-labelledby="login-title"
        >
          <h2
            id="login-title"
            className="text-display-sm font-bold mb-8 text-gray-900 text-center dark:text-white"
          >
            Inicio de sesión
          </h2>

          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

          <p className="mt-6 text-center dark:text-neutral-neu0">
            ¿No tienes una cuenta?{' '}
            <button className="text-blue-600 hover:underline" onClick={() => navigate('/register')}>
              Regístrate
            </button>
          </p>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
