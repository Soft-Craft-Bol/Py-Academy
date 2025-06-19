// assets
import logo from "../../../assets/img/logo-python.webp";

//React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import Button from "../atoms/Button";
import NavigationLinks from "../molecules/navbar/NavigationLinks";
import { ButtonBurguer } from "../atoms/ButtonBurguer";
import { MobileMenu } from "../molecules/navbar/MobileMenu";
import { LogoNavbar } from "../atoms/LogoNavbar";
import { ButtonTheme } from "../atoms/ButtonTheme";

export const NavbarPublic = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const options = [
    { title: "Inicio", to: "/" },
    { title: "Explorar Cursos", to: "/explorar-cursos" },
    {
      title: "Recursos OER",
      to: "/recursos-OER",
    },
    {
      title: "Gestionar Cursos",
      to: "/gestionar-cursos",
    },
  ];

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full dark:bg-gradient-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LogoNavbar logo={logo} title={"PyAcademy"} />
          <NavigationLinks options={options} />

          <div className="hidden align-center items-end md:flex space-x-4">
            <ButtonTheme theme={theme} onChangeTheme={onChangeTheme} />
            <Button variant="primary" size="md" to="/login">
              Iniciar sesión
            </Button>
            <Button variant="secondary" size="md" to="/register">
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
