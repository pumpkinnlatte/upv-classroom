import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsNoInscritos } from '../services/apiGet';
import { addAlumno } from '../services/apiSend';

export const useAlumnoForm = (claseId) => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        claseId: claseId,
        usuarioId: ''
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudentsNoInscritos(claseId);
                setStudents(response);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [claseId]);

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
            const response = await addAlumno(formData);
            if (response) {
                // Redirigir a la página de personas de la clase
                navigate(`/c/${claseId}/personas`);
            }
        } catch (error) {
            console.error('Error al inscribir alumno:', error);
        }
    };

    return {
        students,
        formData,
        handleInputChange,
        handleSubmit
    };
};