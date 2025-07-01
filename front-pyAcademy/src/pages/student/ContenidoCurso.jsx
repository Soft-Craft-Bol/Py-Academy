import { useEffect, useState } from "react";
import VisorFile from "../components/VisorFile";
import ReproductorVideo from "../components/ReproductorVideo";

const mockContenidoAPI = {
    id: "unidad1",
    titulo: "Introducción al Curso",
    tipo: "video", // puede ser "video" o "archivo"
    url: "https://www.example.com/video.mp4",
    nombreArchivo: "video_intro.mp4",
    extension: "mp4"
};

export default function PaginaContenidoCurso() {
  const [contenido, setContenido] = useState(null);

  useEffect(() => {
    // Simular llamada a API
    setTimeout(() => {
      setContenido(mockContenidoAPI); // reemplazar con llamada real después
    }, 500);
  }, []);

    if (!contenido) {
        return (
        <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Cargando contenido...</p>
        </div>
        );
    }

    const esVideo = contenido.tipo === "video";
    const esArchivo = ["pdf", "ppt", "pptx", "doc", "docx", "xls", "xlsx"].includes(contenido.extension);

    return (
        <div className="h-full p-6 bg-white dark:bg-gray-900">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{contenido.titulo}</h2>
            <div className="flex text-center text-lg italic w-full h-full">
                <div className="w-1/2 overflow-y-auto pr-4">
                    {esVideo && (
                        <ReproductorVideo
                        url={contenido.url}
                        nombre={contenido.nombreArchivo}
                        />
                    )}

                    {esArchivo && (
                        <VisorFile
                        documentos={[
                            {
                            uri: contenido.url,
                            fileType: contenido.extension,
                            fileName: contenido.nombreArchivo,
                            }
                        ]}
                        />
                    )}
                </div>
                <div className="w-1/2 p-1 flex items-center justify-center">
                    Contenido
                </div>
            </div>
            {!esVideo && !esArchivo && (
                <p className="text-red-500">Tipo de contenido no soportado.</p>
            )}
        </div>
    );
}
