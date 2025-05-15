import { NavigationLink } from "../atoms/NavigationLink";

const NavigationLinks = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-8">
        <NavigationLink text="Inicio" to={"/"} />
        <NavigationLink text="Explorar Cursos" to={"/explorar-cursos"} />
        <NavigationLink text="Recursos OER" to={"/recursos-OER"} />
        <NavigationLink text="IA Tutor" to={"/ia-tutor"} />
        <NavigationLink text="Gestionar Cursos" to={"/gestionar-cursos"} />
      </ul>
    </nav>
  );
};

export default NavigationLinks;
