import React from "react";

const Card = ({ title, image, description, buttonTitle, onButtonClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-sm mx-auto flex flex-col items-center p-6 text-center hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-contain mb-6"
        loading="lazy"
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button
        onClick={onButtonClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default Card;
