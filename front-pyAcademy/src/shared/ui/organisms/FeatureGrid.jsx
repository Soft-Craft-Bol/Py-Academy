import PropTypes from 'prop-types';
import Card from '../molecules/Card';
import './FeatureGrid.css';

/**
 * Componente FeatureGrid - Organismo para mostrar una grilla de características
 * 
 * @param {Array} features - Lista de características a mostrar
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo descriptivo
 */
const FeatureGrid = ({ features, title, subtitle }) => {
  return (
    <section className="feature-grid-section">
      <div className="feature-grid-header">
        <h2 className="section-title">{title} </h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <div className="feature-grid">
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
};

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