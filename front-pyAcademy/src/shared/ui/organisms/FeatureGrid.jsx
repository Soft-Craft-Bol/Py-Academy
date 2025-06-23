import PropTypes from 'prop-types';

import Card from '../molecules/Card';

/**
 * Componente FeatureGrid - Organismo para mostrar una grilla de características
 *
 * @param {Array} features - Lista de características a mostrar
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo descriptivo
 */
function FeatureGrid({ features, title, subtitle }) {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gradient-2">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h1>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-screen-xl mx-auto px-5">
        {features.map((feature, index) => (
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
            imageUrl={feature.imageUrl}
            buttonText={feature.buttonText}
            onButtonClick={feature.onButtonClick}
          />
        ))}
      </div>
    </section>
  );
}

FeatureGrid.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      buttonText: PropTypes.string,
      onButtonClick: PropTypes.func,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default FeatureGrid;
