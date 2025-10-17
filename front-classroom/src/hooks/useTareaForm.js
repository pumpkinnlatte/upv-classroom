import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendTaskData, sendFileData } from '../services/apiSend';
import { getTopics } from '../services/apiGet';

export const useTareaForm = (claseId) => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formData, setFormData] = useState({
        tituloTarea: '',
        descripcionTarea: '',
        puntosMax: '',
        fechaPublicacion: '',
        fechaLimite: '',
        temaId: '',
        claseId: claseId,
        hasFile: 0
    });

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await getTopics(claseId);

                setTopics(topicsData);
            } catch (error) {
                console.error('Error al obtener los temas:', error);
            }
        };
        fetchTopics();
    }, [claseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
        setFormData(prev => ({
            ...prev,
            hasFile: e.target.files.length > 0 ? 1 : 0
        }));
    };

    const handleSubmit = async () => {
        try {
            const taskResponse = await sendTaskData(formData);
            
            if (selectedFiles.length > 0) {
                const formDataFiles = new FormData();
                formDataFiles.append('publicacionId', taskResponse.tareaId);
                formDataFiles.append('tipoPublicacion', 'tarea');
                formDataFiles.append('claseId', claseId);
                Array.from(selectedFiles).forEach(file => {
                    formDataFiles.append('file', file);
                });
                await sendFileData(formDataFiles);
            }

            navigate(`/c/${claseId}/trabajo`);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        topics,
        handleFileChange,
        selectedFiles
    };
};