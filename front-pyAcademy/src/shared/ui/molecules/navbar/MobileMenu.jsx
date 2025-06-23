import Button from '../../atoms/Button';
import { NavigationLink } from '../../atoms/NavigationLink';

export function MobileMenu() {
  return (
    <div className="md:hidden border-t border-gray-200">
      <nav className="px-4 py-2">
        <ul className="space-y-3 py-3">
          <NavigationLink text="Inicio" />
          <NavigationLink text="Explorar Cursos" />
          <NavigationLink text="Recursos OER" />
          <NavigationLink text="IA Tutor" />
        </ul>
        <div className="flex flex-col space-y-3 mt-4 pb-4">
          <Button variant="primary" size="md">
            Iniciar sesión
          </Button>
          <Button variant="secondary" size="md">
            Registrarse
          </Button>
        </div>
      </nav>
    </div>
  );
}
