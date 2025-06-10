import React, { useState, useRef } from "react";
import {
    FaFilePdf,
    FaVideo,
    FaFilePowerpoint,
    FaTrash,
    FaTimesCircle,
} from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

    const MAX_FILE_SIZE_MB = 10;
    const ALLOWED_EXTENSIONS = [
        ".pdf", ".docx", ".odt", ".txt",
        ".ppt", ".pptx", ".odp",
        ".mp4", ".mov", ".webm",
        ".png", ".jpg", ".jpeg", ".svg",
        ".ipynb", ".html", ".py",
        ".zip", ".csv", ".json"
    ];

    const ResourceManager = () => {
    const [resources, setResources] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [errorModal, setErrorModal] = useState({ visible: false, message: "" });

    const validateFile = (file) => {
        const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        const isAllowed = ALLOWED_EXTENSIONS.includes(extension);
        const isSizeOk = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

        if (!isAllowed)
        return `El archivo "${file.name}" tiene una extensión no permitida.`;

        if (!isSizeOk)
        return `El archivo "${file.name}" excede los ${MAX_FILE_SIZE_MB}MB permitidos.`;

        return null;
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        processFiles(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        processFiles(files);
    };

    const processFiles = (files) => {
        const valid = [];
        for (const file of files) {
        const error = validateFile(file);
        if (error) {
            setErrorModal({ visible: true, message: error });
            continue;
        }
        valid.push({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            file,
        });
        }

        if (valid.length) {
        setResources((prev) => [...prev, ...valid]);
        console.log("Archivos válidos listos para el backend:", valid);
        }
    };

    const getIcon = (type) => {
        if (type.includes("pdf")) return <FaFilePdf className="text-red-500 text-2xl" />;
        if (type.includes("video")) return <FaVideo className="text-blue-500 text-2xl" />;
        if (type.includes("presentation") || type.includes("powerpoint"))
        return <FaFilePowerpoint className="text-orange-500 text-2xl" />;
        return <FiUploadCloud className="text-gray-500 text-2xl" />;
    };

    const handleDelete = (id) => {
        const updated = resources.filter((res) => res.id !== id);
        setResources(updated);
        console.log("Recurso eliminado:", id);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-950 px-4 py-10 text-white">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Gestión de Recursos</h2>

            <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragging
                ? "border-indigo-500 bg-indigo-950"
                : "border-gray-600 bg-slate-800 hover:border-indigo-400"
            }`}
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            >
            <FiUploadCloud className="text-5xl mx-auto text-indigo-400 mb-4" />
            <p className="text-sm text-gray-300">
                Arrastra y suelta archivos aquí, o{" "}
                <span className="text-indigo-400 underline">haz clic para buscar</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
                Tipos: PDF, DOCX, PPT, MP4, IPYNB, ZIP, etc. Máx: {MAX_FILE_SIZE_MB}MB
            </p>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_EXTENSIONS.join(",")}
                className="hidden"
                onChange={handleFileSelect}
            />
            </div>

            <div className="mt-10 bg-slate-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Recursos Subidos</h3>
            {resources.length === 0 ? (
                <p className="text-gray-400">No hay recursos subidos aún.</p>
            ) : (
                <ul className="space-y-4">
                {resources.map((res) => (
                    <li
                    key={res.id}
                    className="flex items-center justify-between bg-slate-700 p-3 rounded-md"
                    >
                    <div className="flex items-center gap-3">
                        {getIcon(res.type)}
                        <span className="text-sm truncate max-w-[240px]">{res.name}</span>
                    </div>
                    <button
                        onClick={() => handleDelete(res.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Eliminar"
                    >
                        <FaTrash />
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>

        {errorModal.visible && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full shadow-2xl text-white">
                <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Error al subir archivo</h4>
                <button
                    onClick={() => setErrorModal({ visible: false, message: "" })}
                    className="text-red-400 hover:text-red-600"
                >
                    <FaTimesCircle size={20} />
                </button>
                </div>
                <p className="text-sm text-gray-300">{errorModal.message}</p>
                <div className="text-right mt-4">
                <button
                    onClick={() => setErrorModal({ visible: false, message: "" })}
                    className="bg-indigo-600 px-4 py-2 text-sm rounded hover:bg-indigo-700"
                >
                    Cerrar
                </button>
                </div>
            </div>
            </div>
        )}
        </section>
    );
};

export default ResourceManager;
