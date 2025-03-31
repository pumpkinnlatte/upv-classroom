// src/pages/TeacherHome.js
import React from 'react'; // Asegúrate de importar React
import { Link, useNavigate } from 'react-router-dom';
import './TeacherHome.css'; // Asegúrate que este CSS existe y tiene los estilos correctos
import { FaRegFolder, FaUsers, FaPlus } from 'react-icons/fa'; // Verifica que estas importaciones sean correctas

// Función para asignar colores a las tarjetas (igual que antes)
const predefinedColors = ['#1a73e8', '#e84118', '#44bd32', '#fbc531', '#9c88ff', '#00a8ff', '#e84393'];
function getCardColor(classId) {
  // Asegura que classId sea un número para la operación módulo
  const numericId = Number(classId) || 0;
  const index = numericId % predefinedColors.length;
  return predefinedColors[index];
}

function TeacherHome() {
  const navigate = useNavigate();

  // --- Datos de Ejemplo (Simulación) ---
  // Clases que imparte este maestro (Asegúrate que tu API devuelva algo similar)
  const taughtClasses = [
    { id: 1, name: "Desarrollo Web Avanzado", section: "S1-6A", studentCount: 25 },
    { id: 5, name: "Programación Orientada a Objetos", section: "S1-4B", studentCount: 32 },
    { id: 7, name: "Estructuras de Datos", section: "S1-3A", studentCount: 28 },
  ].map(course => ({ ...course, color: getCardColor(course.id) }));
  // --- Fin Datos de Ejemplo ---

  const handleCreateClass = () => {
    // Navega a la página/ruta para crear una clase
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
            <Link key={course.id} to={`/teacher/class/${course.id}`} className="class-card-link">
              <div className="class-card">
                {/* Cabecera de la tarjeta */}
                <div className="card-header" style={{ backgroundColor: course.color }}>
                  <h3 className="card-title">
                    <span className="card-title-link">{course.name}</span>
                  </h3>
                  <p className="card-teacher">Sección: {course.section}</p>
                  {/* Avatar comentado, puedes descomentarlo si lo deseas */}
                  {/* <div className="card-avatar" style={{ backgroundColor: course.color }}>
                    <span>{course.name.charAt(0).toUpperCase()}</span>
                  </div> */}
                </div>

                {/* Contenido Principal de la tarjeta */}
                <div className="card-content">
                  {/* ESTA ES LA LÍNEA QUE PROBABLEMENTE DABA ERROR (Línea ~46) */}
                  <p className="student-count">
                    <FaUsers /> {course.studentCount} alumnos
                  </p>
                  {/* Puedes añadir más contenido aquí si es necesario */}
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