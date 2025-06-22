// src/pages/public/PublicCertificateViewer.jsx
import React, { useEffect, useState } from 'react';
import CertificateLogo from '@/assets/CertificateLogo.png';
import estDatPy from '@/assets/ManageCourses/estDatPy.jpg';
import python_basico from '@/assets/ManageCourses/python_basico.jpg';
import EjemploFirma from '@/assets/img/EjemploFirma.png';

import python_basico from '@/assets/ManageCourses/python_basico.jpg';

const mockCompletedCourses = [
  {
    id: 'cert-001',
    user: 'Rodrigo Mauricio Cespedes Paredes',
    courseName: 'Python desde cero',
    description: 'Aprende los fundamentos del lenguaje de programación Python.',
    hours: 8,
    date: '15 de junio de 2025',
    certificateId: 'c001-a1b2-c3d4',
    imageUrl: python_basico,
  },
  {
    id: 'cert-002',
    user: 'Rodrigo Mauricio Cespedes Paredes',
    courseName: 'Estructuras de Datos',
    description: 'Domina listas, pilas y árboles con Python.',
    hours: 6,
    date: '12 de junio de 2025',
    certificateId: 'c002-x9y8-z7w6',
    imageUrl: estDatPy,
  },
];

const PublicCertificateViewer = () => {
  const { id } = useParams();
  const [cert, setCert] = useState(null);

  useEffect(() => {
    const found = mockCompletedCourses.find((c) => c.id === id);
    setCert(found);
  }, [id]);

  if (!cert) {
    return <p className="text-center mt-20 text-gray-600">Certificado no encontrado.</p>;
  }

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-white text-black min-h-screen">
      <div
        id="certificate-view"
        className="w-full max-w-5xl aspect-[1122/794] bg-white border border-gray-300 p-6 shadow-2xl rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-start mb-6">
          <img src={CertificateLogo} alt="Logo" className="w-32 sm:w-40 h-auto" />
          <div className="text-right text-sm text-gray-500">ID: {cert.certificateId}</div>
        </div>

        <h2 className="text-xl text-gray-600 font-semibold mb-2 tracking-widest">CERTIFICADO</h2>
        <p className="text-gray-700 mb-6 text-base">El presente documento se entrega a:</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">{cert.user}</h1>
        <p className="text-gray-700 mb-2 text-base">Por completar con éxito el curso:</p>

        <div className="border border-blue-200 rounded-md p-4 bg-blue-50 mb-4">
          <h3 className="text-lg font-bold text-blue-900">{cert.courseName}</h3>
          <p className="text-sm text-blue-800 mt-1">{cert.description}</p>
        </div>

        <ul className="text-sm text-gray-700 mb-6 space-y-1">
          <li>
            📘 <strong>{cert.hours}</strong> Horas de capacitación
          </li>
          <li>
            📅 <strong>{cert.date}</strong>
          </li>
          <li>
            🔗{' '}
            <a
              href={`https://mi-plataforma.edu/cursos/${cert.courseName.toLowerCase().replace(/ /g, '-')}`}
              className="text-blue-700 underline"
            >
              https://mi-plataforma.edu/cursos/{cert.courseName.toLowerCase().replace(/ /g, '-')}
            </a>
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-end gap-12 mt-10">
          {['Vladimir Costas', 'Leticia Blanco'].map((name) => (
            <div key={name} className="text-center">
              <div className="flex flex-col items-center">
                <img src={EjemploFirma} alt="Firma" className="h-12 mb-1 object-contain" />
                <div className="h-[1px] bg-black w-40 mb-1"></div>
                <p className="font-semibold">{name}</p>
                <p className="text-xs">Docente</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicCertificateViewer;
