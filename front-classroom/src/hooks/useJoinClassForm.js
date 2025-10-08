import { useState } from 'react';
import { joinClass } from '../services/apiSend';
import { useNavigate } from 'react-router-dom';

export const useJoinClassForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codigoClase: ''
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
            const response = await joinClass(formData);
            if (response) {
                setFormData({ codigoClase: '' }); // Limpiar el formulario
                alert('Te has unido a la clase exitosamente.');
                navigate(0);
            }
        } catch (error) {
            alert('Error al unirse a la clase. Asegúrate de que el código sea correcto o que no estés ya inscrito en la clase.');
            console.error('Error al unirse a la clase:', error);
        }
    };

    return {
        formData,
        handleInputChange,
        handleSubmit
    };
};