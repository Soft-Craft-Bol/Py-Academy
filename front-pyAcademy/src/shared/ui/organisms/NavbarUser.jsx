// assets
import logo from "../../../assets/img/logo-python.webp";

//React
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

// components
import { MobileMenu } from "../molecules/navbar/MobileMenu";
import { LogoNavbar } from "../atoms/LogoNavbar";
import { ButtonTheme } from "../atoms/ButtonTheme";

export const NavbarUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full dark:bg-primary-pri2 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LogoNavbar logo={logo} title={"PyAcademy"} />
          <div className="hidden align-center items-end md:flex space-x-4">
            <ButtonTheme theme={theme} onChangeTheme={onChangeTheme} />
            <FaUserCircle className="rounded text-4xl" />
          </div>
        </div>
      </div>

      {isMenuOpen && <MobileMenu />}
    </header>
  );
};
