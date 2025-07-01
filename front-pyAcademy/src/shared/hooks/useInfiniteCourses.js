import { useState, useEffect, useCallback } from 'react';
import { getAllCourses } from '../api/api';

export const useInfiniteCourses = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await getAllCourses(page, 15);
      const newCourses = response.data.cursosConProfesor;

      if (newCourses.length > 0) {
        setCourses((prev) => {
          const existingIds = new Set(prev.map((c) => c.course.id));
          const filteredNew = newCourses.filter((c) => !existingIds.has(c.course.id));
          return [...prev, ...filteredNew];
        });
      }

      setHasMore(response.data.hasNext);
      if (response.data.hasNext) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 100 ||
      loading ||
      !hasMore
    ) {
      return;
    }
    fetchCourses();
  }, [loading, hasMore, fetchCourses]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { courses, loading, error, hasMore };
};
