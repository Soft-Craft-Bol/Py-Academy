// hooks/useCourseUnits.js
import { useState, useEffect } from 'react';
import { getUnitsForCourse } from '../api/api';

export const useCourseUnits = (courseId) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchUnits = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUnitsForCourse(courseId);
        setUnits(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching units:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [courseId]);

  return { units, loading, error };
};
