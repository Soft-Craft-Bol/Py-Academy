//css
import "./Login.css";

//Compoentes
import heroImage from "../../assets/heroImage.png";
import Button from "../../shared/ui/atoms/Button";

//React
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      {/* Main Content */}
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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa una contraseña"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              onClick={() => navigate("/student")}
            >
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            ¿No tienes una cuenta?
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
