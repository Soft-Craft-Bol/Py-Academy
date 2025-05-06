import FeatureGrid from '../../shared/ui/organisms/FeatureGrid';
import HeroSection from './components/HeroSection';
import './Home.css';

const Home = () => {
  const features = [
    {
      title: 'Editor de Código Interactivo',
      description: 'Practica Python con retroalimentación inmediata y corrección automática.',
      buttonText: 'Probar ahora',
      onButtonClick: () => console.log('Ir al editor'),
    },
    {
      title: 'Lecciones en Video',
      description: 'Aprende con material multimedia cuidadosamente seleccionado.',
      buttonText: 'Ver lecciones',
      onButtonClick: () => console.log('Ir a lecciones'),
    },
    {
      title: 'Chat con IA',
      description: 'Resuelve tus dudas al instante con nuestro asistente inteligente.',
      buttonText: 'Chatear ahora',
      onButtonClick: () => console.log('Abrir chat'),
    },
  ];

  return (
    <div className="home-page">
      <HeroSection />
      <FeatureGrid
        title="Características Principales"
        subtitle="Todo lo que necesitas para dominar la programación"
        features={features}
      />
    </div>
  );
};

export default Home;