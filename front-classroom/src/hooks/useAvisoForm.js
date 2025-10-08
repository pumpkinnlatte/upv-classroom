import { useState } from 'react';
import { sendAnnouncementData, sendFileData } from '../services/apiSend';
import { useClass } from '../context/ClassContext';

export const useAvisoForm = (onSuccess) => {
    const { currentClass } = useClass();
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        hasFile: 0
    });
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
        setFormData(prev => ({
            ...prev,
            hasFile: e.target.files.length > 0 ? 1 : 0
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const avisoData = {
                clase_id: currentClass.clase_id,
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                fechaPublicacion: '',
                hasFile: formData.hasFile
            };

            const avisoResponse = await sendAnnouncementData(avisoData);

            if (selectedFiles.length > 0) {
                const fileFormData = new FormData();
                selectedFiles.forEach(file => {
                    fileFormData.append('file', file);
                });
                fileFormData.append('publicacionId', avisoResponse.avisoId);
                fileFormData.append('tipoPublicacion', 'aviso');
                fileFormData.append('claseId', currentClass.clase_id);

                await sendFileData(fileFormData);
            }

            setFormData({ titulo: '', descripcion: '', hasFile: 0 });
            setSelectedFiles([]);

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            console.error('Error al crear el aviso:', error);
        }
    };

    return {
        formData,
        selectedFiles,
        handleInputChange,
        handleFileChange,
        handleSubmit
    };
};