import { useState } from 'react';
import { sendClassData } from '../services/apiSend';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../context/AuthContext';

export const useClaseForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        carrera: '',
        cuatrimestre: '',
        profesorId: getUserId() || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendClassData(formData);
            if (response) {
                // Redirect to the class page after successful creation
                navigate('/');
            }
        } catch (error) {
            console.error('Error al crear la clase:', error);
            // Here you could add error handling, like showing a notification
        }
    };

    return {
        formData,
        handleInputChange,
        handleSubmit
    };
};