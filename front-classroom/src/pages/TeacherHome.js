// src/pages/TeacherHome.js
import React, { useState, useEffect }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TeacherHome.css'; //
import { FaRegFolder, FaUsers, FaPlus } from 'react-icons/fa';
const api_route = require("../config.json").api_route; // Importar la ruta base de la API

// Función para asignar colores a las tarjetas
const predefinedColors = ['#1a73e8', '#e84118', '#44bd32', '#fbc531', '#9c88ff', '#00a8ff', '#e84393'];
function getCardColor(classId) {
    const numericId = Number(classId) || 0;
    const index = numericId % predefinedColors.length;
    return predefinedColors[index];
}

function TeacherHome() {
  const navigate = useNavigate();
    const [taughtClasses, setTaughtClasses] = useState([]);

    useEffect(() => {
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
                setTaughtClasses(data.map(course => ({ ...course, color: getCardColor(course.clase_id) })));
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchClasses();
    },[]);

    const handleCreateClass = () => {
        navigate('/teacher/create-class');
    };

  return (
    <div className="teacher-home-page">
      {/* Encabezado con título y botón de crear */}
      <div className="page-header">
        <h2 className="page-title">Clases que imparto</h2>
        <button className="create-class-button" onClick={handleCreateClass}>
          <FaPlus className="button-icon" />
          Crear Clase
        </button>
      </div>

      {/* Grid de Clases */}
      {taughtClasses.length > 0 ? (
        <div className="class-grid">
          {taughtClasses.map(course => (
            <Link key={course.clase_id} to={`/teacher/c/${course.clase_id}`} className="class-card-link">
              <div className="class-card">
                {/* Cabecera de la tarjeta */}
                <div className="card-header" style={{ backgroundColor: course.color }}>
                  <h3 className="card-title">
                    <span className="card-title-link">{course.nombre_clase}</span>
                  </h3>
                  <p className="card-teacher">Carrera: {course.carrera}</p>
                  {/* Avatar comentado, puedes descomentarlo si lo deseas */}
                  {/* <div className="card-avatar" style={{ backgroundColor: course.color }}>
                    <span>{course.nombre_clase.charAt(0).toUpperCase()}</span>
                  </div> */}
                </div>

                {/* Contenido Principal de la tarjeta */}
                <div className="card-content">
                  <p className="card-description">{course.descripcion_clase}</p>
              
                  {/*<p className="card-code">Código: {course.codigo_clase}</p>}*/}
                </div>

                {/* Pie de la tarjeta con acciones */}
                <div className="card-actions">
                  <button onClick={(e) => { e.preventDefault(); alert('Abrir carpeta (pendiente)'); }} title="Abrir carpeta de la clase">
                    <FaRegFolder />
                  </button>
                  <button onClick={(e) => { e.preventDefault(); alert('Ver alumnos (pendiente)'); }} title="Ver lista de alumnos">
                    <FaUsers />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Mensaje y botón si no hay clases
        <div className="no-classes-container">
          <p className="no-classes">Aún no has creado ninguna clase.</p>
          <button className="create-class-button large" onClick={handleCreateClass}>
             <FaPlus className="button-icon" />
             Crear tu primera clase
          </button>
        </div>
      )}
    </div>
  );
}

export default TeacherHome;