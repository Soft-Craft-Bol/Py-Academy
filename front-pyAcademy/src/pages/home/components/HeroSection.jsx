import Button from "../../../shared/ui/atoms/Button";
import "./HeroSection.css";
import heroImage from "../../../assets/heroImage.png";

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center w-full px-12 py-13 h-screen justify-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="w-[50%]">
        <h1 className="text-display-lg w-96 font-bold">Domina python con IA</h1>
        <p className="w-[450px] my-6 text-title-sm">
          Descubre una forma revolucionaria de aprender Python con nuestra
          plataforma impulsada por IA y recursos educativos abiertos..
        </p>
        <div>
          <Button size="lg" onClick={() => console.log("Registrarse")}>
            Comenzar ahora
          </Button>
        </div>
      </div>
      <div className="w-[573px] h-[382px] rounded-[20px] overflow-hidden shadow-blue-500/50 shadow-xl scale-100 hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={heroImage}
          alt="Estudiante programando"
          className="w-full h-full object-cover scale-100"
        />
      </div>
    </section>
  );
};

export default HeroSection;
