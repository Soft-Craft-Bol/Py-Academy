//React
import { useContext, useState } from 'react';

import logo from '../../../assets/img/logo-python.webp';
import { ButtonTheme } from '../atoms/ButtonTheme';
import { LogoNavbar } from '../atoms/LogoNavbar';
import { getUser } from '@/features/auth/utils/authCookies';
import { useNavigate } from 'react-router-dom';
//Components
import { MobileMenu } from '../molecules/navbar/MobileMenu';

//Context
import { ThemeContext } from '@/app/context/ThemeContext';

export function NavbarUser() {
  const currentUser = getUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme, onChangeTheme } = useContext(ThemeContext);

  const foto =
    currentUser?.photo ||
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
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
            {/* <FaUserCircle className="rounded text-4xl" /> */}
            <img
              src={foto}
              alt="Foto de perfil"
              className="rounded-full w-10 h-10 object-cover border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                if (currentUser?.role === "ESTUDIANTE") {
                  navigate(`/student/profile/${currentUser.id}`);
                } else if (currentUser.role === "MAESTRO") {
                  navigate(`/teacher/profile/${currentUser.id}`);
                } else {
                  navigate(`/profile/${currentUser.id}`); // Ruta por defecto
                }
              }}
            />
            <span className="flex items-center">{currentUser.username}</span>
          </div>
        </div>
      </div>
      {isMenuOpen && <MobileMenu />}
    </header>
  );
}
