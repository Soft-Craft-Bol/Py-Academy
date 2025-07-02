import { VisorFile } from '../organisms/VisorFile';
import { ReproductorVideo } from '../organisms/ReproductorVideo';
import PropTypes from 'prop-types';
import { getMaterialsByUnit } from '@/shared/api/api';
import { useEffect, useState } from 'react';

function UnitDisplay({ unit }) {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const res = await getMaterialsByUnit(unit.unitId);
        console.log('res', res);
        const firstMaterial = res.data[0];
        setMaterial(firstMaterial);
      } catch (err) {
        console.error('❌ Error al obtener material:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [unit.id]);

  const esVideo = material?.materialType === 'VIDEO';
  const esArchivo = ['PDF', 'IMAGEN'].includes(material?.materialType || '');

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md">
      <div className="w-1/2 p-1 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{unit.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{unit.description}</p>
      </div>
      <div className="w-full overflow-y-auto pr-4">
        {/*loading && <p className="text-blue-500">Cargando material...</p>*/}
        {/*error && <p className="text-red-500">Error al cargar material.</p>*/}
        {!loading && material && (
          <div className="mt-2">
            {esVideo && <ReproductorVideo url={material.url} />}

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
    </div>
  );
}

UnitDisplay.propTypes = {
  unit: PropTypes.shape({
    materialId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default UnitDisplay;
