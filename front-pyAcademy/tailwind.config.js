/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // habilita modo oscuro con clase 'dark'
  theme: {
    extend: {
      colors: {
        primary: {
          pri1: "#0A0F1C",
          pri2: "#1A1F2E",
          pri3: "#4318D1",
          pri4: "#C5E6FD",
        },
        error: {
          err1: "#AC010C", // Rojo oscuro – fondo de alerta crítica
          err2: "#BA1A1A", // Rojo medio – texto de error o bordes de input inválido
          err3: "#DE3730", // Rojo claro – mensajes de error o íconos de advertencia
        },
        neutral: {
          neu0: "#EFF4F9",
          neu1: "#F3F4F6",
        },
        brand: {
          accent: "#6C38FF", // Morado vibrante – botón destacado o énfasis visual
        },
      },

      fontSize: {
        "display-sm": ["36px", { lineHeight: "44px" }],
        "display-md": ["45px", { lineHeight: "52px" }],
        "display-lg": ["57px", { lineHeight: "64px" }],
        "title-sm": ["18px", { lineHeight: "22px" }],
        "title-md": ["24px", { lineHeight: "28px" }],
        "title-lg": ["28px", { lineHeight: "32px" }],
        "label-sm": ["14px", { lineHeight: "16px" }],
        "label-md": ["16px", { lineHeight: "18px" }],
        "label-lg": ["22px", { lineHeight: "24px" }],
        "body-sm": ["14px", { lineHeight: "16px" }],
        "body-md": ["16px", { lineHeight: "18px" }],
        "body-lg": ["20px", { lineHeight: "22px" }],
      },

      backgroundImage: {
        "gradient-1":
          "linear-gradient(to right, #0A0F1C 0%, #1A1F2E 50%, #0A0F1C 100%)",
        "gradient-2": "linear-gradient(to bottom, #0A0F1C 0%, #1A1F2E 100%)",
      },
    },
  },
  plugins: [],
};
