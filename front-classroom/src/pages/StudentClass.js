// src/pages/StudentClass.js
import React from 'react'; // Añade import
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './StudentClass.css';
import { FaArrowLeft } from 'react-icons/fa'; // Importa icono

function StudentClass() {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtén función navigate

  const className = "Desarrollo Web Avanzado"; // Ejemplo
  const announcements = [ /* ... datos ejemplo ... */ ];

  return (
    <div className="student-class-page">
      {/* --- BOTÓN DE REGRESO --- */}
      <button onClick={() => navigate(-1)} className="back-button">
         <FaArrowLeft /> Regresar
      </button>
      {/* ----------------------- */}

      <header className="class-header">
        <h2>{className}</h2>
        <p className="class-id-display">(Clase ID: {id})</p>
      </header>

      <section className="class-content">
        <div className="announcements-section">
          <h3>Avisos Recientes</h3>
          {announcements.length > 0 ? (
            <ul className="announcements-list">
              {announcements.map(announcement => (
                <li key={announcement.id} className="announcement-item">
                  <div className="announcement-content"><p>{announcement.text}</p></div>
                  <div className="announcement-meta">
                     <span>Publicado: {announcement.date}</span>
                     {/* ... adjuntos ... */}
                  </div>
                </li>
              ))}
            </ul>
          ) : ( <p className="no-announcements">No hay avisos...</p> )}
        </div>
        {/* ... otras secciones ... */}
      </section>
    </div>
  );
}

export default StudentClass;