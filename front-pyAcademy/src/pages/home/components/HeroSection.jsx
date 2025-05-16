import Button from "../../../shared/ui/atoms/Button";
import "./HeroSection.css";
import heroImage from "../../../assets/heroImage.png";

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col lg:flex-row items-center w-full px-6 md:px-12 py-10 md:py-13 h-auto lg:h-screen justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold max-w-md">
          Domina python con IA
        </h1>
        <p className="max-w-lg mt-4 mb-8 text-base md:text-lg text-gray-700 dark:text-gray-300">
          Descubre una forma revolucionaria de aprender Python con nuestra
          plataforma impulsada por IA y recursos educativos abiertos.
        </p>
        <Button size="lg" onClick={() => console.log("Registrarse")}>
          Comenzar ahora
        </Button>
      </div>

      <div className="w-full lg:w-[573px] h-auto max-h-[400px] rounded-[20px] overflow-hidden shadow-blue-500/50 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105">
        <img
          src={heroImage}
          alt="Estudiante programando"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
