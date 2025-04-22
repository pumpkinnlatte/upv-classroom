import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendTopicData } from '../services/apiSend';

export const useTemaForm = (claseId) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombreTema: '',
        descripcionTema: '',
        claseId: claseId || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendTopicData(formData);
            navigate(`/c/${claseId}/trabajo`);
        } catch (error) {
            console.error('Error al crear el tema:', error);
        }
    };

    return {
        formData,
        handleInputChange,
        handleSubmit
    };
};