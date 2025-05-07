import Button from '../../../shared/ui/atoms/Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Aprende Programación de Manera Interactiva</h1>
        <p className="hero-subtitle">
          Domina los fundamentos de Python con nuestra plataforma educativa diseñada para estudiantes
          universitarios.
        </p>
        <div className="hero-actions">
          <Button size="lg" onClick={() => console.log('Registrarse')}>
            Comenzar ahora
          </Button>
          <Button variant="secondary" size="lg" onClick={() => console.log('Ver más')}>
            Conoce más
          </Button>
        </div>
      </div>
      <div className="hero-image">
        <img src="https://imagenes.20minutos.es/files/image_990_556/uploads/imagenes/2023/05/09/foto-de-archivo-de-una-estudiante-fabricando-un-robot.jpeg" alt="Estudiante programando" />
      </div>
    </section>
  );
};

export default HeroSection;