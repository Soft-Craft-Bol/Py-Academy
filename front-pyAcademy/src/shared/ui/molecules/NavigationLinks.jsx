import { NavigationLink } from "../atoms/NavigationLink";

const NavigationLinks = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <NavigationLink text="Inicio" />
        <NavigationLink text="Explorar Cursos" />
        <NavigationLink text="Recursos OER" />
        <NavigationLink text="IA Tutor" />
      </ul>
    </nav>
  );
};

export default NavigationLinks;
