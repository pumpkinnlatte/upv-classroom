import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMaterialData, sendFileData } from '../services/apiSend';
import { getTopics } from '../services/apiGet';

export const useMaterialForm = (claseId) => {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formData, setFormData] = useState({
        tituloMaterial: '',
        descripcionMaterial: '',
        fechaPublicacion: '',
        temaId: '',
        claseId: claseId || '',
        hasFile: 0
    });

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await getTopics(claseId);

                console.log("topicsData", topicsData);  
                setTopics(topicsData);
            } catch (error) {
                console.error('Error al obtener los temas:', error);
            }
        };
        if (claseId) {
            fetchTopics();
        }
    }, [claseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
        setFormData(prev => ({
            ...prev,
            hasFile: files.length > 0 ? 1 : 0
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const materialResponse = await sendMaterialData(formData);
            
            if (selectedFiles.length > 0) {
                const formDataFiles = new FormData();
                formDataFiles.append('publicacionId', materialResponse.materialId);
                formDataFiles.append('tipoPublicacion', 'material');
                formDataFiles.append('claseId', claseId);
                Array.from(selectedFiles).forEach(file => {
                    formDataFiles.append('file', file);
                });
                await sendFileData(formDataFiles);
            }
            navigate(`/c/${claseId}/trabajo`);
        } catch (error) {
            console.error('Error al crear el material:', error);
        }
    };

    return {
        formData,
        selectedFiles,
        topics,
        handleInputChange,
        handleFileChange,
        handleSubmit
    };
};