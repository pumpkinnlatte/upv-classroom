// src/pages/TeacherClass.js - CON PESTAÑAS Y BOTÓN REGRESO
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './TeacherClass.css';
import {
  FaBullhorn, FaTasks, FaFolderOpen, FaUsers, FaPaperclip, FaArrowLeft,
  FaPlusCircle, FaTrashAlt, FaSearch, FaUserPlus, FaCalendarAlt
} from 'react-icons/fa';

// ... (Datos de ejemplo y función getCardColor si la usas aquí) ...
const initialClassName = "Desarrollo Web Avanzado"; /* ... otros datos ... */

function TeacherClass() {
  const { id } = useParams();
  const navigate = useNavigate(); // Obtén función navigate
  const [className, setClassName] = useState(initialClassName);
  const [activeTab, setActiveTab] = useState('avisos');
  // ... (todos los demás estados para avisos, tareas, materiales, alumnos) ...

  useEffect(() => { /* ... carga inicial ... */ }, [id]);

  // ... (todos los manejadores: handlePublishAnnouncement, handleAddTask, handleAddMaterial, handleSearchStudents, etc.) ...
  const handleFileChange = (e, setFile, setFileName) => { /* ... */ }
  const handleRemoveFile = (e, setFile, setFileName, inputId) => { /* ... */ }


  return (
    <div className="teacher-class-page">
       {/* --- BOTÓN DE REGRESO --- */}
       <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Regresar
       </button>
       {/* ----------------------- */}

      <header className="class-header">
        <h2>{className} <span className="class-id-display">(ID: {id})</span></h2>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="class-tabs">
         <button onClick={() => setActiveTab('avisos')} className={`tab-button ${activeTab === 'avisos' ? 'active' : ''}`}><FaBullhorn /> Avisos</button>
         <button onClick={() => setActiveTab('tareas')} className={`tab-button ${activeTab === 'tareas' ? 'active' : ''}`}><FaTasks /> Tareas</button>
         <button onClick={() => setActiveTab('materiales')} className={`tab-button ${activeTab === 'materiales' ? 'active' : ''}`}><FaFolderOpen /> Materiales</button>
         <button onClick={() => setActiveTab('alumnos')} className={`tab-button ${activeTab === 'alumnos' ? 'active' : ''}`}><FaUsers /> Alumnos</button>
      </nav>

      {/* Contenido de la Pestaña Activa */}
      <main className="tab-content">
        {activeTab === 'avisos' && ( <div className="tab-pane announcements-tab"> {/* ... Contenido Avisos ... */} </div> )}
        {activeTab === 'tareas' && ( <div className="tab-pane tasks-tab"> {/* ... Contenido Tareas ... */} </div> )}
        {activeTab === 'materiales' && ( <div className="tab-pane materials-tab">{/* ... Contenido Materiales ... */} </div> )}
        {activeTab === 'alumnos' && ( <div className="tab-pane students-tab">{/* ... Contenido Alumnos ... */} </div> )}
      </main>
    </div>
  );
}
// Asegúrate de exportar o definir los manejadores aquí también si los sacaste
// const handlePublishAnnouncement = (...) => { ... };
// ... etc ...

export default TeacherClass;