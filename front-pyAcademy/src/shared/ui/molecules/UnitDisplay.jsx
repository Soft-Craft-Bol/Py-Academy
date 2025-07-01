import { useUnitMaterial } from '@/shared/hooks/useUnitMaterial';
import VisorFile from "../components/VisorFile";
import ReproductorVideo from "../components/ReproductorVideo";

function UnitDisplay({ unit }) {
  const { material, loading, error } = useUnitMaterial(unit.materialId);

  const esVideo = material?.materialType === "video";
  const esArchivo = ["pdf", "ppt", "pptx", "doc", "docx", "xls", "xlsx"].includes(material?.extension || "");

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{unit.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{unit.description}</p>

      {loading && <p className="text-blue-500">Cargando material...</p>}
      {error && <p className="text-red-500">Error al cargar material.</p>}

      {!loading && material && (
        <div className="mt-2">
          {esVideo && (
            <ReproductorVideo
              url={material.url}
            />
          )}

          {esArchivo && (
            <VisorFile
              documentos={[
                {
                  uri: material.url,
                  fileType: material.materialType,
                  fileName: material.title,
                },
              ]}
            />
          )}

          {!esVideo && !esArchivo && (
            <p className="text-red-500">Tipo de contenido no soportado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UnitDisplay;
