//Components
import { MenuInformation } from "../molecules/MenuInformation";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const informationPlataforma = {
    title: "Plataforma",
    items: [
      { content: "Explorar Cursos", url: "#" },
      { content: "Recursos OER", url: "#" },
      { content: "Comunidad", url: "#" },
    ],
  };

  const informationSoporte = {
    title: "Soporte",
    items: [
      { content: "Centro de Ayuda", url: "#" },
      { content: "Documentación", url: "#" },
      { content: "Contacto", url: "#" },
    ],
  };

  const informationLegal = {
    title: "Legal",
    items: [
      { content: "Términos", url: "#" },
      { content: "Privacidad", url: "#" },
      { content: "Cookies", url: "#" },
    ],
  };

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-700 rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <span className="font-bold text-lg">PyAcademy</span>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Transformando la educación en programación con IA y recursos
              abiertos.
            </p>
          </div>

          <MenuInformation information={informationPlataforma} />
          <MenuInformation information={informationSoporte} />
          <MenuInformation information={informationLegal} />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} PyAcademy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
