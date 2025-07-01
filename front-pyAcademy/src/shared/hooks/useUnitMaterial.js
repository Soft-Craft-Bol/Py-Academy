import { useEffect, useState } from 'react';
import { getMaterialsByUnit } from '../api/api';

export function useUnitMaterial(unitId) {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!unitId) return;

    setLoading(true);
    getMaterialsByUnit(unitId)
      .then((res) => setMaterial(res.data)) 
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [unitId]);

  return { material, loading, error };
}
