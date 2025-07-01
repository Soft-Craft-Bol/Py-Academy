import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FaFilePdf, FaVideo, FaTrash, FaTimesCircle } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import { useUploadResources } from '@/shared/hooks/useUploadResources';
import api from '@/shared/api/api'; // Asegúrate de importar la instancia de API

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_EXTENSIONS = ['.pdf', '.mp4', '.mov'];

const ManageResources = ({ course, units }) => {
    const [resources, setResources] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorModal, setErrorModal] = useState({ visible: false, message: '' });
    const [successModal, setSuccessModal] = useState({ visible: false, message: '' });
    const fileInputRef = useRef(null);
    const { uploadFile, uploading } = useUploadResources();

    // Verificar que el unitId sea válido
    const validateUnitId = (unitId) => {
        if (!unitId || isNaN(unitId)) {
            setErrorModal({ visible: true, message: 'Unidad no válida.' });
            return false;
        }
        return true;
    };

    const registerMaterial = async (url, fileName, unitId, fileType) => {
        // Validar unitId antes de enviar
        if (!validateUnitId(unitId)) return;

        // Determinar el tipo de material (PDF, VIDEO, etc.) basado en la extensión del archivo
        let materialType = "VIDEO"; // Default to VIDEO
        if (fileType.includes("pdf")) {
            materialType = "PDF";
        } else if (fileType.includes("video")) {
            materialType = "VIDEO";
        } else if (fileType.includes("presentation")) {
            materialType = "PRESENTATION";
        }

        // Crear el objeto para el material a enviar al backend
        const materialData = {
            title: fileName,
            description: 'Descripción del recurso',
            url,
            materialType,
            durationMinutes: 10,  // Duración del material en minutos
            isMandatory: true,
            sequenceNumber: 1,  // Número de secuencia
            unitId: unitId,  // Usar el unitId correcto
        };

        try {
            // Realizar la solicitud POST para registrar el material en el backend
            const response = await api.post('/learning/materials', materialData);
            console.log('Material registrado:', response.data);
            setSuccessModal({ visible: true, message: 'Material registrado con éxito.' });
        } catch (err) {
            console.error('Error al registrar material:', err.response ? err.response.data : err.message);
            setErrorModal({ visible: true, message: 'Error al registrar el material. ' + (err.response?.data?.message || '') });
        }
    };

    const validateFile = (file) => {
        const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return `“${file.name}” tiene extensión ${ext}, no permitida.`;
        }
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            return `“${file.name}” excede ${MAX_FILE_SIZE_MB}MB.`;
        }
        return null;
    };

    const processFiles = (fileList) => {
        const valid = [];
        Array.from(fileList).forEach((file) => {
            const err = validateFile(file);
            if (err) {
                setErrorModal({ visible: true, message: err });
            } else {
                valid.push({
                    id: `${Date.now()}-${Math.random()}`,
                    name: file.name,
                    type: file.type,
                    file,
                });
            }
        });
        if (valid.length) {
            setResources((prev) => [...prev, ...valid]);
            console.log('Archivos válidos listos para enviar:', valid);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files) processFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const handleDelete = (id) => {
        setResources((prev) => prev.filter((r) => r.id !== id));
        console.log('Recurso eliminado:', id);
    };

    const handleUpload = async () => {
        if (!resources.length) return;
        console.log('Iniciando subida de recursos...', resources);
        const uploaded = [];

        for (const res of resources) {
            try {
                console.log(`[Subiendo a Cloudinary]: ${res.name}`);
                const url = await uploadFile(res.file);
                console.log(`[Subido con éxito]: ${res.name} → ${url}`);
                uploaded.push({ name: res.name, url, type: res.type });

                // Obtener el unitId correctamente
                const unitId = units[0]?.unitId;
                console.log('unitId de la primera unidad:', unitId);

                // Validar y registrar el material
                if (validateUnitId(unitId)) {
                    await registerMaterial(url, res.name, unitId, res.type); // Registrar el material con el unitId y fileType
                }

            } catch (err) {
                console.error(`Error al subir ${res.name}:`, err);
                setErrorModal({ visible: true, message: `Error al subir “${res.name}”.` });
                return;
            }
        }

        console.log('Todos los archivos subidos:', uploaded);
        setResources([]);
    };

    return (
        <section className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10 text-gray-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Gestión de Recursos</h2>
                <p className="mb-2 text-gray-600 dark:text-gray-400">
                    Extensiones permitidas: {ALLOWED_EXTENSIONS.join(', ')}
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Tamaño máximo por archivo: {MAX_FILE_SIZE_MB}MB
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {units.map((unit, index) => (
                        <div key={unit.unitId} className="border-2 border-dashed p-4 rounded-md">
                            <h3 className="font-semibold text-xl mb-2">{unit.title}</h3>
                            <div
                                className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                                    isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-100'
                                }`}
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={() => setIsDragging(true)}
                                onDragLeave={() => setIsDragging(false)}
                            >
                                <FiUploadCloud className="text-5xl text-indigo-500 mb-4" />
                                <p className="text-sm text-gray-700">Arrastra archivos o haz clic para buscar</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept={ALLOWED_EXTENSIONS.join(',')}
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleUpload}
                        disabled={!resources.length || uploading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2 rounded-md"
                    >
                        {uploading ? 'Subiendo...' : 'Subir recursos'}
                    </button>
                </div>

                <div className="mt-10 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Recursos Seleccionados</h3>
                    {resources.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No hay archivos seleccionados.</p>
                    ) : (
                        <ul className="space-y-3">
                            {resources.map((res) => (
                                <li key={res.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md">
                                    <div className="flex items-center gap-3">
                                        {res.type.includes('pdf') ? (
                                            <FaFilePdf className="text-red-500 text-2xl" />
                                        ) : res.type.includes('video') ? (
                                            <FaVideo className="text-blue-500 text-2xl" />
                                        ) : (
                                            <FiUploadCloud className="text-gray-500 text-2xl" />
                                        )}
                                        <span className="text-sm truncate max-w-[200px]">{res.name}</span>
                                    </div>
                                    <button onClick={() => handleDelete(res.id)} className="text-red-500 hover:text-red-600">
                                        <FaTrash />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Modal de error */}
                {errorModal.visible && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-2xl text-gray-900 dark:text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-semibold">Error</h4>
                                <button onClick={() => setErrorModal({ visible: false, message: '' })} className="text-red-400 hover:text-red-600">
                                    <FaTimesCircle size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{errorModal.message}</p>
                            <div className="text-right mt-4">
                                <button onClick={() => setErrorModal({ visible: false, message: '' })} className="bg-indigo-600 px-4 py-2 text-sm rounded hover:bg-indigo-700 text-white">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de éxito */}
                {successModal.visible && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-2xl text-gray-900 dark:text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-semibold">Éxito</h4>
                                <button onClick={() => setSuccessModal({ visible: false, message: '' })} className="text-green-400 hover:text-green-600">
                                    <FaTimesCircle size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{successModal.message}</p>
                            <div className="text-right mt-4">
                                <button onClick={() => setSuccessModal({ visible: false, message: '' })} className="bg-indigo-600 px-4 py-2 text-sm rounded hover:bg-indigo-700 text-white">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

ManageResources.propTypes = {
    course: PropTypes.object.isRequired,
    units: PropTypes.array.isRequired,
};

export default ManageResources;
