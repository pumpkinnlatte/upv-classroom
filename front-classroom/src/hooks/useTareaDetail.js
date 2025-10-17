import { useState, useEffect } from 'react';
import { getTaskById, getArchivos, getEntregasByTarea } from '../services/apiGet';

export const useTareaDetail = (tareaId, isTeacher) => {
    const [tarea, setTarea] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [entregas, setEntregas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTareaDetail = async () => {
            try {
                setLoading(true);
                const fetchPromises = [
                    getTaskById(tareaId),
                    getArchivos(tareaId, 'tarea'),
                ];

                if (isTeacher) {
                    fetchPromises.push(getEntregasByTarea(tareaId));
                }

                const responses = await Promise.all(fetchPromises);

                setTarea(responses[0]);
                setArchivos(responses[1]);
                if (isTeacher) {
                    setEntregas(responses[2]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tareaId) {
            fetchTareaDetail();
        }
    }, [tareaId, isTeacher]);

    return { tarea, archivos, entregas, error };
};