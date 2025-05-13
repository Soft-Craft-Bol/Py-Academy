import PropTypes from "prop-types";
import Button from "../atoms/Button";
import "./Card.css";

/**
 * Componente Card - Molécula reutilizable para tarjetas de contenido
 *
 * @param {string} title - Título de la tarjeta
 * @param {string} description - Descripción del contenido
 * @param {string} imageUrl - URL de la imagen (opcional)
 * @param {string} buttonText - Texto del botón de acción
 * @param {function} onButtonClick - Manejador del botón
 */
const Card = ({ title, description, imageUrl, buttonText, onButtonClick }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h3 className="text-title-md font-medium my-3">{title}</h3>
        <p className="card-description">{description}</p>
        {buttonText && (
          <Button variant="secondary" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default Card;
