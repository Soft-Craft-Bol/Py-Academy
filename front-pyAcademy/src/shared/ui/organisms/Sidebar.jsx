//React
import { motion } from 'framer-motion';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoCodeSlash } from 'react-icons/io5';
import { LuBookCopy } from 'react-icons/lu';
import { PiCertificateBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MobileMenuButton } from '../atoms/MobileMenuButton';
import { MobileSidebar } from '../molecules/sidebar/MobileSidebar';
import { SidebarFooter } from '../molecules/sidebar/SidebarFooter';
//Components
import { SidebarMenu } from '../molecules/sidebar/SidebarMenu';

export function Sidebar({ isSidebarOpen, isMenuOpen, toggleSidebar, toggleMenu }) {
  const navigate = useNavigate();

  const options = [
    { title: "Mis cursos", to: "/student", Icon: LuBookCopy },
    { title: "Editor de codigo", to: "editor", Icon: IoCodeSlash },
    { title: "Ejercicios", to: "exercises", Icon: GiArtificialIntelligence },
    { title: "Certificados", to: "certificates", Icon: PiCertificateBold },
    { title: "Creacion de cursos", to: "create-course", Icon: PiCertificateBold },

  ];

  const handleLogout = async () => {
    try {
      navigate('/', { replace: true, state: { loggedOut: true } });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <motion.div
        layout
        className={`shadow-blue-500/30 shadow-xl hidden md:block fixed top-0 left-0 h-screen bg-white dark:bg-primary-pri4 text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-56' : 'w-16'
        }`}
      >
        <SidebarMenu options={options} isSidebarOpen={isSidebarOpen} />

        <SidebarFooter
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />
      </motion.div>

      <div className="flex md:hidden justify-end px-4 py-2">
        <MobileMenuButton onToggleMenu={toggleMenu} />
      </div>

      <MobileSidebar
        onLogout={handleLogout}
        onToggleMenu={toggleMenu}
        options={options}
        isMenuOpen={isMenuOpen}
      />
    </>
  );
}

// Validación de props
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
