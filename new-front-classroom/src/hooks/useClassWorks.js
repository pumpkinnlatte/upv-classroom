import { useState, useEffect } from 'react';
import { getTopics, getTasks, getMaterials } from '../services/apiGet';

export const useClassWorks = (classId) => {
    const [topics, setTopics] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const fetchClassWorks = async () => {
            // Si ya se inicializó o no hay classId, no hacer nada
            if (isInitialized || !classId) return;

            try {
                setLoading(true);
                const [topicsData, tasksData, materialsData] = await Promise.all([
                    getTopics(classId),
                    getTasks(classId),
                    getMaterials(classId)
                ]);

                setTopics(topicsData);
                setTasks(tasksData);
                setMaterials(materialsData);
                setIsInitialized(true);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClassWorks();
    }, [classId, isInitialized]); // Solo se ejecuta cuando cambia classId o isInitialized

    return { topics, tasks, materials, loading, error };
};

export default useClassWorks;