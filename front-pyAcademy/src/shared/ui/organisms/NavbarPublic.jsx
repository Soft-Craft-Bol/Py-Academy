// assets
//React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/img/logo-python.webp';
// components
import Button from '../atoms/Button';
import { ButtonBurguer } from '../atoms/ButtonBurguer';
import { ButtonTheme } from '../atoms/ButtonTheme';
import { LogoNavbar } from '../atoms/LogoNavbar';
import { MobileMenu } from '../molecules/navbar/MobileMenu';
import NavigationLinks from '../molecules/navbar/NavigationLinks';

export function NavbarPublic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const options = [
    { title: 'Inicio', to: '/' },
    { title: 'Explorar Cursos', to: '/explorar-cursos' },
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm w-full dark:bg-gradient-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LogoNavbar logo={logo} title={'PyAcademy'} />
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
}
