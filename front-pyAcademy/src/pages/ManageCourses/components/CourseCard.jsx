import React from "react";

const CourseCard = ({ title, description, imageUrl, onViewMore }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full">
      <div className="h-80 relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
          <h2 className="text-white text-lg font-bold">{title}</h2>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between h-48">
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <button
          onClick={onViewMore}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition duration-300"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
