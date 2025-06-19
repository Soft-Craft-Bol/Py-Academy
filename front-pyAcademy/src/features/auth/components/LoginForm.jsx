// features/auth/components/LoginForm.js
import React from "react";
import Button from "@/shared/ui/atoms/Button";

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-label-md mb-2 dark:text-neutral-neu0"
        >
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico"
          required
          className="w-full rounded-md border px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#414862]"
          disabled={isLoading}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-label-md mb-2 dark:text-neutral-neu0"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Ingresa una contraseña"
          required
          className="w-full rounded-md border px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#414862]"
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
