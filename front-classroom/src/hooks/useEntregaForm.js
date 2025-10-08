import { useState } from 'react';
import { subirEntrega, sendFileData } from '../services/apiSend';
import{ useNavigate } from 'react-router-dom';

export const useEntregaForm = (tareaId, claseId) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            // Primero creamos la entrega
            const entregaResponse = await subirEntrega(tareaId, {
                hasFile: selectedFiles.length > 0
            });

            // Si hay archivos, los subimos
            if (selectedFiles.length > 0) {
                const fileFormData = new FormData();
                
                selectedFiles.forEach(file => {
                    fileFormData.append('file', file);
                });
                fileFormData.append('publicacionId', entregaResponse.entregaId);
                fileFormData.append('tipoPublicacion', 'entrega');
                fileFormData.append('claseId', claseId);

                await sendFileData(fileFormData);
            }

            alert('Entrega enviada exitosamente.');
            navigate(0);
            setSelectedFiles([]);
            
        } catch (err) {
            setError(err.message || 'Error al subir la entrega');
            console.error('Error en useEntregaForm:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        selectedFiles,
        loading,
        error,
        handleFileChange,
        handleSubmit
    };
};