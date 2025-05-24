import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../features/auth/components/LoginForm";
import heroImage from "../../assets/heroImage.png";
import { useAuth } from "../../app/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = React.useState("");

  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      navigate("/student"); // O "/dashboard" según tu estructura
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <main className="flex flex-1 max-w-7xl mx-auto px-4 sm:px-8 items-center justify-center gap-12 flex-col lg:flex-row py-16">
        {/* Imagen Terminal */}
        <div className="w-full max-w-md rounded-lg shadow-lg overflow-hidden lg:max-w-lg dark:shadow-blue-500/50 shadow-xl transition-transform duration-300 ease-in-out">
          <img
            src={heroImage}
            alt="Imagen login"
            className="w-full h-auto object-cover"
          />
        </div>

        <section
          className="bg-white border rounded-2xl shadow-lg p-8 sm:p-10 w-full max-w-md"
          aria-labelledby="login-title"
        >
          <h2
            id="login-title"
            className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 text-center"
          >
            Inicio de sesión
          </h2>

          <LoginForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            error={error} 
          />

          <p className="mt-6 text-center text-gray-600">
            ¿No tienes una cuenta?{" "}
            <button 
              className="text-blue-600 hover:underline" 
              onClick={() => navigate("/register")}
            >
              Regístrate
            </button>
          </p>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;