// src/pages/student/Certificates.jsx
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import CertificateLogo from "@/assets/CertificateLogo.png";
import python_basico from "@/assets/ManageCourses/python_basico.jpg";
import estDatPy from "@/assets/ManageCourses/estDatPy.jpg";
import EjemploFirma from "@/assets/img/EjemploFirma.png";

const mockCompletedCourses = [
  {
    id: "cert-001",
    courseName: "Python desde cero",
    description: "Aprende los fundamentos del lenguaje de programación Python.",
    hours: 8,
    date: "15 de junio de 2025",
    certificateId: "c001-a1b2-c3d4",
    imageUrl: python_basico
  },
  {
    id: "cert-002",
    courseName: "Estructuras de Datos",
    description: "Domina listas, pilas y árboles con Python.",
    hours: 6,
    date: "12 de junio de 2025",
    certificateId: "c002-x9y8-z7w6",
    imageUrl: estDatPy
  }
];

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selected, setSelected] = useState(null);
  const userName = "Rodrigo Mauricio Cespedes Paredes"; // ← Simulado desde AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setCertificates(mockCompletedCourses);
      const params = new URLSearchParams(location.search);
      const certId = params.get("cert");
      if (certId) {
        const cert = mockCompletedCourses.find(c => c.id === certId);
        if (cert) setSelected(cert);
      }
    }, 500);
  }, [location.search]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("certificate-view");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selected.courseName}_certificado.pdf`);
  };

  const handleShare = () => {
    const shareURL = `${window.location.origin}/student/certificates?cert=${selected.id}`;
    navigator.clipboard.writeText(shareURL).then(() => alert("Enlace copiado al portapapeles"));
  };

  if (selected) {
    return (
      <div className="flex flex-col items-center py-10 px-4 gap-4 bg-white text-black">
        <div
          id="certificate-view"
          className="w-full max-w-5xl aspect-[1122/794] bg-white border border-gray-300 p-6 shadow-2xl rounded-xl overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <img src={CertificateLogo} alt="Logo" className="w-32 sm:w-40 h-auto" />
            <div className="text-right text-sm text-gray-500">
              ID: {selected.certificateId}
            </div>
          </div>

          <h2 className="text-xl text-gray-600 font-semibold mb-2 tracking-widest">CERTIFICADO</h2>
          <p className="text-gray-700 mb-6 text-base">El presente documento se entrega a:</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">{userName}</h1>
          <p className="text-gray-700 mb-2 text-base">Por completar con éxito el curso:</p>

          <div className="border border-blue-200 rounded-md p-4 bg-blue-50 mb-4">
            <h3 className="text-lg font-bold text-blue-900">{selected.courseName}</h3>
            <p className="text-sm text-blue-800 mt-1">{selected.description}</p>
          </div>

          <ul className="text-sm text-gray-700 mb-6 space-y-1">
            <li>📘 <strong>{selected.hours}</strong> Horas de capacitación</li>
            <li>📅 <strong>{selected.date}</strong></li>
            <li>
              🔗 <a
                href={`https://mi-plataforma.edu/cursos/${selected.courseName.toLowerCase().replace(/ /g, "-")}`}
                className="text-blue-700 underline"
              >
                https://mi-plataforma.edu/cursos/{selected.courseName.toLowerCase().replace(/ /g, "-")}
              </a>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row justify-end gap-12 mt-10">
            {["Vladimir Costas", "Leticia Blanco"].map((name) => (
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

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => {
              navigate("/student/certificates");
              setSelected(null);
            }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Volver
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Descargar PDF
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm"
          >
            Compartir enlace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-6">Certificados disponibles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/student/certificates?cert=${course.id}`)}
            className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-lg border border-gray-200 hover:border-blue-500 transition"
          >
            <img
              src={course.imageUrl}
              alt={course.courseName}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{course.courseName}</h3>
              <p className="text-sm text-gray-600">{course.date}</p>
              <p className="text-xs text-gray-400 mt-2">ID: {course.certificateId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;