// assets
//React
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import logo from '../../../assets/img/logo-python.webp';
import { ButtonTheme } from '../atoms/ButtonTheme';
import { LogoNavbar } from '../atoms/LogoNavbar';
// components
import { MobileMenu } from '../molecules/navbar/MobileMenu';

export function NavbarUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm w-full dark:bg-primary-pri4 dark:text-white
    "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LogoNavbar logo={logo} title={'PyAcademy'} />
          <div className="hidden align-center items-end md:flex space-x-4">
            <ButtonTheme theme={theme} onChangeTheme={onChangeTheme} />
            <FaUserCircle className="rounded text-4xl" />
          </div>
        </div>
      </div>

      {isMenuOpen && <MobileMenu />}
    </header>
  );
}
