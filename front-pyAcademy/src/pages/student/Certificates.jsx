import { useEffect, useState } from 'react';
import CertificateLogo from '@/assets/CertificateLogo.png';
import EjemploFirma from '@/assets/img/EjemploFirma.png';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { getUserDetails, getCourseByStudent } from '@/shared/api/api';
import { getUser } from '@/features/auth/utils/authCookies';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getUser();
  const user = currentUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener datos del usuario
        const userResponse = await getUserDetails(user);
        setUserData(userResponse.data);

        // Obtener cursos del estudiante
        const coursesResponse = await getCourseByStudent(user);

        // Transformar los cursos al formato de certificados
        const transformedCertificates = coursesResponse.data.map(course => ({
          id: `cert-${course.id}`,
          courseName: course.name,
          description: course.description,
          hours: course.durationInHours,
          date: new Date(course.endDate).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          certificateId: `cert-${course.id}-${Math.random().toString(36).substring(2, 10)}`,
          imageUrl: course.image
        }));

        setCertificates(transformedCertificates);

        // Verificar si hay un certificado en la URL
        const params = new URLSearchParams(location.search);
        const certId = params.get('cert');
        if (certId) {
          const cert = transformedCertificates.find((c) => c.id === certId);
          if (cert) setSelected(cert);
        }
      } catch (err) {
        setError('Error al cargar los certificados. Por favor intenta nuevamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search, user.id]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('certificate-view');
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selected.courseName}_certificado.pdf`);
  };

  const handleShare = () => {
    const shareURL = `${window.location.origin}/certificado/${selected.id}`;
    navigator.clipboard.writeText(shareURL).then(() => alert('Enlace copiado al portapapeles'));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  if (selected) {
    return (
      <div className="flex flex-col items-center py-10 px-4 gap-4 bg-white text-black">
        <div
          id="certificate-view"
          className="w-full max-w-5xl aspect-[1122/794] bg-white border border-gray-300 p-6 shadow-2xl rounded-xl overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <img src={CertificateLogo} alt="Logo" className="w-32 sm:w-40 h-auto" />
            <div className="text-right text-sm text-gray-500">ID: {selected.certificateId}</div>
          </div>

          <h2 className="text-xl text-gray-600 font-semibold mb-2 tracking-widest">CERTIFICADO</h2>
          <p className="text-gray-700 mb-6 text-base">El presente documento se entrega a:</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
            {userData ? `${userData.firstName} ${userData.lastName}` : 'Nombre del Estudiante'}
          </h1>
          <p className="text-gray-700 mb-2 text-base">Por completar con éxito el curso:</p>

          <div className="border border-blue-200 rounded-md p-4 bg-blue-50 mb-4">
            <h3 className="text-lg font-bold text-blue-900">{selected.courseName}</h3>
            <p className="text-sm text-blue-800 mt-1">{selected.description}</p>
          </div>

          <ul className="text-sm text-gray-700 mb-6 space-y-1">
            <li>
              📘 <strong>{selected.hours}</strong> Horas de capacitación
            </li>
            <li>
              📅 <strong>{selected.date}</strong>
            </li>
            <li>
              🔗{' '}
              <a
                href={`https://mi-plataforma.edu/cursos/${selected.courseName.toLowerCase().replace(/ /g, '-')}`}
                className="text-blue-700 underline"
              >
                https://mi-plataforma.edu/cursos/
                {selected.courseName.toLowerCase().replace(/ /g, '-')}
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

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => {
              navigate('/student/certificates');
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
      {certificates.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No tienes certificados disponibles todavía.</p>
        </div>
      ) : (
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
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Curso+sin+imagen';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{course.courseName}</h3>
                <p className="text-sm text-gray-600">{course.date}</p>
                <p className="text-xs text-gray-400 mt-2">ID: {course.certificateId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
