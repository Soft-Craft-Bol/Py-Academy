// React
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Icons
import { LuClipboardList, LuFilePlus, LuBookMarked } from 'react-icons/lu';

// Componentes internos
import { SidebarMenu } from '../molecules/sidebar/SidebarMenu';
import { SidebarFooter } from '../molecules/sidebar/SidebarFooter';
import { MobileMenuButton } from '../atoms/MobileMenuButton';
import { MobileSidebar } from '../molecules/sidebar/MobileSidebar';

export function TeacherSidebar({ isSidebarOpen, isMenuOpen, toggleSidebar, toggleMenu }) {
    const navigate = useNavigate();

    const options = [
        { title: 'Mis Evaluaciones', to: '/teacher', Icon: LuClipboardList },
        { title: 'Crear evaluación', to: '/teacher/newAssessments', Icon: LuFilePlus },
        { title: 'Crear Curso', to: '/teacher/gestionar-cursos', Icon: LuBookMarked },
        { title: 'Crear práctica de programación', to: '/teacher/create-practice', Icon: LuFilePlus }
    ];

    const handleLogout = () => {
        navigate('/', { replace: true, state: { loggedOut: true } });
    };

    return (
        <>
        <motion.div
            layout
            className={`shadow-purple-500/30 shadow-xl hidden md:block fixed top-0 left-0 h-screen bg-white dark:bg-primary-pri4 text-white transition-all duration-300 ${
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

// ✅ Validación de props
TeacherSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
