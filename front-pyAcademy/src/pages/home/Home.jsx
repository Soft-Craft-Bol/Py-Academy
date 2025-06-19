import { useEffect } from "react";

//Components
import FeatureGrid from "../../shared/ui/organisms/FeatureGrid";
import HeroSection from "./components/HeroSection";
import { saludo } from "../../shared/api/api";

//assets
import chatbotImage from "../../assets/img/chatbot.png";
import editorCodigo from "../../assets/img/editorCodigo.png";
import lecciones from "../../assets/img/lecciones.jpg";

import "./Home.css";

const Home = () => {
  useEffect(() => {
    const fetchSaludo = async () => {
      try {
        const response = await saludo("Mundo");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching saludo:", error);
      }
    };

    fetchSaludo();
  }, []);

  const features = [
    {
      title: "Editor de Código Interactivo",
      description:
        "Practica Python con retroalimentación inmediata y corrección automática.",
      buttonText: "Probar ahora",
      onButtonClick: () => console.log("Ir al editor"),
      imageUrl: editorCodigo,
    },
    {
      title: "Lecciones en Video",
      description:
        "Aprende con material multimedia cuidadosamente seleccionado.",
      buttonText: "Ver lecciones",
      onButtonClick: () => console.log("Ir a lecciones"),
      imageUrl: lecciones,
    },
    {
      title: "Chat con IA",
      description:
        "Resuelve tus dudas al instante con nuestro asistente inteligente.",
      buttonText: "Chatear ahora",
      onButtonClick: () => console.log("Abrir chat"),
      imageUrl: chatbotImage,
    },
  ];

  return (
    <div className="home-page" data-testid="home-page">
      <HeroSection data-testid="hero-section" />
      <FeatureGrid
        title="Características Principales"
        subtitle="Todo lo que necesitas para dominar la programación"
        features={features}
      />
    </div>
  );
};

export default Home;
