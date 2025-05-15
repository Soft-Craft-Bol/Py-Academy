// assets
import logo from "../../../assets/logo-python.webp";

//React
import { useState } from "react";
import { Link } from "react-router-dom";  // Importar Link de react-router-dom

// components
import Button from "../atoms/Button";
import NavigationLinks from "../molecules/NavigationLinks";
import { ButtonBurguer } from "../atoms/ButtonBurguer";
import { MobileMenu } from "../molecules/MobileMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="PyAcademy Logo" className="w-10 h-10" />
              <h1 className="font-bold text-lg text-gray-800 hidden sm:block">
                PyAcademy
              </h1>
            </div>
          </div>

          {/* Agregar "Gestionar Cursos" al lado de los enlaces existentes */}
          <div className="flex items-center space-x-4">
            <NavigationLinks />

            {/* Enlace "Gestionar Cursos" al lado de IA Tutor */}
            <Link to="/gestionar-cursos" className="text-gray-800 font-medium hover:text-blue-600">
              Gestionar Cursos
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Button variant="primary" size="md">
              <Link to="/login">
                Iniciar sesión
              </Link>
            </Button>
            <Button variant="secondary" size="md">
              Registrarse
            </Button>
          </div>
          <ButtonBurguer onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>

      {isMenuOpen && <MobileMenu />}
    </header>
  );
};
