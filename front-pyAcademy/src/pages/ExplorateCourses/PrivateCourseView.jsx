import React, { useState } from "react";
import { FaClipboardList, FaBullhorn, FaBell, FaBook } from "react-icons/fa";
import pythonVarPractica from "@/assets/course/Variables de python.png";
import estructuraPractica from "@/assets/course/Estructuras de control.png";
import NuevoModulo from "@/assets/course/Nuevo modulo.png";
import Webinars from "@/assets/course/Webinars.png";

const tabs = [
  { key: "practicas", label: "Prácticas" },
  { key: "noticias", label: "Noticias" },
  { key: "avisos", label: "Avisos" },
  { key: "materiales", label: "Materiales" },
];

const staticData = {
  practicas: [
    {
      id: 1,
      title: "Práctica 1: Variables en Python",
      due: "05/06/2025",
      description: "Aprenderás a declarar y usar variables en Python, con ejercicios guiados paso a paso.",
      image: pythonVarPractica
    },
    {
      id: 2,
      title: "Práctica 2: Estructuras de Control",
      due: "12/06/2025",
      description: "Uso de condicionales y bucles para controlar el flujo del programa.",
      image: estructuraPractica
    },
  ],
  noticias: [
    {
      id: 1,
      title: "Nuevo módulo de IA disponible",
      date: "01/06/2025",
      content: "Ya puedes acceder al nuevo módulo de Introducción a la Inteligencia Artificial en la sección de materiales.",
      image: NuevoModulo
    },
    {
      id: 2,
      title: "Webinar de desarrollo web este viernes",
      date: "03/06/2025",
      content: "No te pierdas nuestro próximo webinar con expertos en frontend este viernes a las 6:00 PM.",
      image: Webinars
    },
  ],
  avisos: [
    {
      id: 1,
      message: "El sistema estará en mantenimiento el 08/06",
      image: "https://source.unsplash.com/600x400/?maintenance"
    },
    {
      id: 2,
      message: "Entrega de notas el 15/06",
      image: "https://source.unsplash.com/600x400/?grades"
    },
  ],
  materiales: [
    {
      id: 1,
      title: "Slides Semana 1",
      link: "#",
      description: "Presentación sobre introducción a la programación y sintaxis básica.",
      image: "https://source.unsplash.com/600x400/?slides"
    },
    {
      id: 2,
      title: "Código de ejemplo",
      link: "#",
      description: "Repositorio con ejemplos prácticos de clases anteriores.",
      image: "https://source.unsplash.com/600x400/?code"
    },
  ],
};

const CourseDashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const renderContent = () => {
    const list = staticData[activeTab];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
          >
            {item.image && <img src={item.image} alt={item.title} className="rounded-xl mb-4 h-48 w-full object-cover" />}
            {activeTab === "practicas" && (
              <>
                <h4 className="font-semibold text-xl text-gray-800 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Fecha de entrega: {item.due}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
              </>
            )}
            {activeTab === "noticias" && (
              <>
                <h4 className="font-semibold text-xl text-gray-800 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.date}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.content}</p>
              </>
            )}
            {activeTab === "avisos" && (
              <p className="text-gray-800 dark:text-white text-lg font-medium">{item.message}</p>
            )}
            {activeTab === "materiales" && (
              <>
                <h4 className="font-semibold text-xl text-gray-800 dark:text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                <a href={item.link} className="text-blue-600 hover:underline font-semibold text-sm">
                  Ver material
                </a>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 shadow-md p-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Curso: Desarrollo Web</h1>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-yellow-200">
            <FaBell size={22} />
          </button>
          <button className="text-white hover:text-yellow-200">
            <FaBullhorn size={22} />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-72 bg-white dark:bg-gray-800 shadow-xl p-8">
          <ul className="space-y-6">
            {tabs.map(tab => (
              <li key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-lg font-medium transition-all focus:outline-none shadow-sm hover:shadow-md 
                    ${activeTab === tab.key
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-800"}`}
                >
                  {tab.key === "practicas" && <FaClipboardList />}
                  {tab.key === "noticias" && <FaBullhorn />}
                  {tab.key === "avisos" && <FaBell />}
                  {tab.key === "materiales" && <FaBook />}
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CourseDashboard;