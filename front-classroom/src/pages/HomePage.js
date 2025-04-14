import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegFolder, FaUsers, FaPlus, FaUserGraduate } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import './HomePage.css';

const api_route = require("../config.json").api_route;

const predefinedColors = ['#1a73e8', '#e84118', '#44bd32', '#fbc531', '#9c88ff', '#00a8ff', '#e84393'];
function getCardColor(classId) {
    const numericId = Number(classId) || 0;
    const index = numericId % predefinedColors.length;
    return predefinedColors[index];
}

function HomePage() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [joinMessage, setJoinMessage] = useState({ type: '', text: '' });
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setIsTeacher(decoded.tipoUsuario === "profesor");
        }
        fetchClasses();
    }, []);

    async function fetchClasses() {
        try {
            const response = await fetch(`${api_route}/class/get-classes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (!response.ok) {
                throw new Error('No se pudieron obtener las clases');
            }
            const data = await response.json();
            setClasses(data.map(course => ({ ...course, color: getCardColor(course.clase_id) })));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleCreateClass = () => {
        navigate('/teacher/create-class');
    };

    const handleJoinClass = async (event) => {
        event.preventDefault();
        setIsJoining(true);
        try {
            const response = await fetch(`${api_route}/class/join-by-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ codigoClase: joinCode }),
            });

            const result = await response.json();
            
            if (response.ok) {
                setJoinMessage({ type: 'success', text: 'Te has unido a la clase exitosamente.' });
                setJoinCode("");
                fetchClasses();
            } else {
                setJoinMessage({ type: 'error', text: result.message || 'Error al unirse a la clase.' });
            }
        } catch (error) {
            setJoinMessage({ type: 'error', text: 'Error de red al intentar unirse a la clase.' });
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="home-page">
            <div className="page-header">
                <h2 className="page-title">{isTeacher ? 'Clases que imparto' : 'Mis Clases'}</h2>
                {isTeacher ? (
                    <button className="create-class-button" onClick={handleCreateClass}>
                        <FaPlus className="button-icon" />
                        Crear Clase
                    </button>
                ) : (
                    <form onSubmit={handleJoinClass} className="join-class-form">
                        <input 
                            type="text" 
                            className="join-code-input" 
                            placeholder="Código de la clase" 
                            value={joinCode} 
                            onChange={(e) => setJoinCode(e.target.value)} 
                            disabled={isJoining} 
                        />
                        <button type="submit" className="join-button" disabled={isJoining}>
                            {isJoining ? 'Uniéndote...' : 'Unirse'}
                        </button>
                    </form>
                )}
            </div>

            {!isTeacher && joinMessage.text && (
                <div className={`join-message ${joinMessage.type}`}>{joinMessage.text}</div>
            )}

            {classes.length > 0 ? (
                <div className="class-grid">
                    {classes.map(course => (
                        <Link 
                            key={course.clase_id} 
                            to={`/c/${course.clase_id}`} 
                            className="class-card-link"
                        >
                            <div className="class-card">
                                <div className="card-header" style={{ backgroundColor: course.color }}>
                                    <h3 className="card-title">
                                        <span className="card-title-link">{course.nombre_clase}</span>
                                    </h3>
                                    <p className="card-teacher">Carrera: {course.carrera}</p>
                                    {!isTeacher && <p className="teacher-name">{course.nombre_profesor}</p>}
                                </div>
                                <div className="card-content">
                                    <p className="card-description">{course.descripcion_clase}</p>
                                </div>
                                <div className="card-actions">
                                    <button onClick={(e) => { e.preventDefault(); alert('Abrir carpeta (pendiente)'); }} title="Abrir carpeta de la clase">
                                        <FaRegFolder />
                                    </button>
                                    {isTeacher ? (
                                        <button onClick={(e) => { e.preventDefault(); alert('Ver alumnos (pendiente)'); }} title="Ver lista de alumnos">
                                            <FaUsers />
                                        </button>
                                    ) : (
                                        <button onClick={(e) => { e.preventDefault(); alert('Ver tus trabajos (pendiente)'); }} title="Ver tus trabajos">
                                            <FaUserGraduate />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="no-classes-container">
                    {isTeacher ? (
                        <>
                            <p className="no-classes">Aún no has creado ninguna clase.</p>
                            <button className="create-class-button large" onClick={handleCreateClass}>
                                <FaPlus className="button-icon" />
                                Crear tu primera clase
                            </button>
                        </>
                    ) : (
                        <p className="no-classes">Aún no estás inscrito en ninguna clase.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;