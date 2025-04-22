import { useState, useEffect } from 'react';
import { getAllPublications } from '../services/publicationsService';

export const usePublications = (classId) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    setLoading(true);
    try {
        setLoading(true);
        const data = await getAllPublications(classId);
        console.log(data);
        setPublications(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (classId) {
        fetchPublications();
    }
  }, [classId]);

  return { publications, loading, error, reloadPublications: fetchPublications };
};