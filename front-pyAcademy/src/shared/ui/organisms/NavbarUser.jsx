// assets
import logo from "../../../assets/logo-python.webp";

//React
import { useState, useEffect } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

// components
import Button from "../atoms/Button";
import { MobileMenu } from "../molecules/MobileMenu";

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
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="PyAcademy Logo" className="w-10 h-10" />
              <h1 className="font-bold text-lg text-gray-800 hidden sm:block dark:text-white">
                PyAcademy
              </h1>
            </div>
          </div>

          <div className="hidden align-center items-end md:flex space-x-4">
            <Button size="sm" variant="secondary" onClick={onChangeTheme}>
              {theme === "dark" ? (
                <MdWbSunny className="text-yellow-300 rounded text-xl" />
              ) : (
                <BsMoonStarsFill className="text-blue-300 rounded text-xl" />
              )}
            </Button>

            <FaUserCircle className="rounded text-4xl" />
          </div>
        </div>
      </div>

      {isMenuOpen && <MobileMenu />}
    </header>
  );
};
