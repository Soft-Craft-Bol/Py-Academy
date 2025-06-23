import React from 'react';

import Button from '../atoms/Button';

function Card({ title, description, imageUrl, buttonText, onButtonClick }) {
  return (
    <div className="bg-white rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-transform duration-200 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-[180px] object-cover sm:h-[140px]" />
      <div className="p-5 flex flex-col flex-grow sm:p-4">
        <h3 className="text-[18px] font-semibold text-gray-900 mb-3 text-center">{title}</h3>
        <p className="text-[14px] text-gray-600 mb-4 leading-relaxed flex-grow">{description}</p>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
}

export default Card;
