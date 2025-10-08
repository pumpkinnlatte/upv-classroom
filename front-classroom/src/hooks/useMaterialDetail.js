import { useState, useEffect } from 'react';
import { getMaterialById, getArchivos } from '../services/apiGet';

export const useMaterialDetail = (materialId) => {
    const [material, setMaterial] = useState(null);
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterialDetail = async () => {
            try {
                setLoading(true);
                const [materialData, archivosData] = await Promise.all([
                    getMaterialById(materialId),
                    getArchivos(materialId, 'material')
                ]);

                setMaterial(materialData);
                setArchivos(archivosData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (materialId) {
            fetchMaterialDetail();
        }
    }, [materialId]);

    return { material, archivos, loading, error };
};