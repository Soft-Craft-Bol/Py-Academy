import React from 'react';

export function ButtonBurguer({ onClick, isMenuOpen }) {
  return (
    <button className="md:hidden flex items-center" onClick={onClick} aria-label="Menú principal">
      <svg className="w-6 h-6 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
