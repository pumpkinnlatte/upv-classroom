// src/pages/TeacherClass.js - COMPLETO CON TABS, SIN DATOS DE EJEMPLO
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TeacherClass.css'; // Asegúrate de tener el CSS correspondiente
// Importa todos los iconos necesarios
import {
  FaBullhorn, FaTasks, FaFolderOpen, FaUsers, FaPaperclip, FaArrowLeft,
  FaPlusCircle, FaTrashAlt, FaSearch, FaUserPlus, FaCalendarAlt
} from 'react-icons/fa';

// --- COMPONENTE PRINCIPAL ---
function TeacherClass() {
  const { id } = useParams(); // ID de la clase actual
  const navigate = useNavigate(); // Hook para el botón Regresar
  const [className, setClassName] = useState("Cargando nombre..."); // Placeholder inicial

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('avisos'); // Pestaña inicial

  // --- Estados inicializados como VACÍOS ---
  const [announcements, setAnnouncements] = useState([]); // Lista de avisos vacía
  const [tasks, setTasks] = useState([]);             // Lista de tareas vacía
  const [materials, setMaterials] = useState([]);       // Lista de materiales vacía
  const [enrolledStudents, setEnrolledStudents] = useState([]); // Lista de alumnos vacía
  const [topics, setTopics] = useState([]);             // Lista de temas vacía

  // --- Estados para Formularios (inicializados vacíos) ---
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementFile, setAnnouncementFile] = useState(null);
  const [announcementFileName, setAnnouncementFileName] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskInstructions, setTaskInstructions] = useState("");
  const [taskTopic, setTaskTopic] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskFile, setTaskFile] = useState(null);
  const [taskFileName, setTaskFileName] = useState("");

  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [materialTopic, setMaterialTopic] = useState("");
  const [materialFile, setMaterialFile] = useState(null);
  const [materialFileName, setMaterialFileName] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingEnroll, setIsLoadingEnroll] = useState(false);

  // Carga inicial de datos (AHORA SOLO SIMULA LA LLAMADA)
  useEffect(() => {
    console.log(`Renderizando TeacherClass para ID: ${id}`);
    // --- AQUÍ IRÍAN LAS LLAMADAS REALES A LA API ---
    // Ejemplo: fetch(`/api/maestro/clases/${id}`)
    //              .then(res => res.json())
    //              .then(data => {
    //                  setClassName(data.nombre_clase);
    //                  setAnnouncements(data.avisos || []);
    //                  setTasks(data.tareas || []);
    //                  setMaterials(data.materiales || []);
    //                  setEnrolledStudents(data.alumnos || []);
    //                  setTopics(data.temas || ["General"]); // Asegura al menos un tema
    //              })
    //              .catch(error => console.error("Error cargando datos:", error));

    // --- SIMULACIÓN SIN DATOS INICIALES ---
    setClassName("Nombre de Clase (Cargado)"); // Simula carga de nombre
    setTopics(["General", "Unidad 1", "Proyecto Final"]); // Carga temas básicos para selects
    setAnnouncements([]); // Asegura empezar vacío
    setTasks([]);
    setMaterials([]);
    setEnrolledStudents([]);
    // ------------------------------------

  }, [id]); // Dependencia del ID de la clase

  // --- Manejadores de Archivos (Sin cambios) ---
  const handleFileChange = (e, setFile, setFileName) => {
      const file = e.target.files[0];
      if(file) { setFile(file); setFileName(file.name); }
      else { setFile(null); setFileName(''); }
  };
  const handleRemoveFile = (e, setFile, setFileName, inputId) => {
      e.preventDefault();
      setFile(null); setFileName('');
      const fileInput = document.getElementById(inputId);
      if (fileInput) fileInput.value = "";
  };

  // --- Manejadores de Submit (La lógica de simulación AÑADE al estado) ---
  const handlePublishAnnouncement = (event) => {
    event.preventDefault();
    if (!announcementText.trim()) { alert("Escribe un aviso."); return; }
    const newAnnouncementData = { text: announcementText, file: announcementFile };
    console.log("Publicando aviso (simulación):", newAnnouncementData);
    // LLAMADA A API...

    // Simulación éxito: Añade a la lista y limpia form
    const newId = Date.now();
    const newAnn = { id: newId, text: announcementText, date: new Date().toISOString().slice(0, 10), attachments: announcementFile ? [announcementFileName] : [] };
    setAnnouncements(prev => [newAnn, ...prev]); // Añade al principio
    setAnnouncementText("");
    handleRemoveFile(event, setAnnouncementFile, setAnnouncementFileName, 'announcementAttachmentFile');
    // alert("Aviso publicado (simulación)"); // Quizás no mostrar alerta siempre
  };

   const handleAddTask = (e) => {
     e.preventDefault();
     if(!taskTitle || !taskTopic || !taskDueDate) { alert("Completa Título, Tema y Fecha Límite."); return; }
     const newTaskData = { title: taskTitle, instructions: taskInstructions, topic: taskTopic, dueDate: taskDueDate, file: taskFile };
     console.log("Asignando Tarea (simulación):", newTaskData);
     // LLAMADA A API...

     // Simulación éxito: Añade a lista y limpia form
     const newId = Date.now();
     const newTask = { id: newId, title: taskTitle, dueDate: taskDueDate, topic: taskTopic };
     setTasks(prev => [newTask, ...prev]);
     setTaskTitle(''); setTaskInstructions(''); setTaskTopic(''); setTaskDueDate('');
     handleRemoveFile(e, setTaskFile, setTaskFileName, 'taskAttachmentFile');
     // alert("Tarea asignada (simulación)");
   };

  const handleAddMaterial = (e) => {
    e.preventDefault();
     if(!materialTitle || !materialTopic) { alert("Completa Título y Tema."); return; }
    const newMaterialData = { title: materialTitle, description: materialDescription, topic: materialTopic, file: materialFile };
    console.log("Publicando Material (simulación):", newMaterialData);
    // LLAMADA A API...

    // Simulación éxito: Añade a lista y limpia form
     const newId = Date.now();
     const newMat = { id: newId, title: materialTitle, description: materialDescription, topic: materialTopic, attachments: materialFile ? [materialFileName] : [] };
     setMaterials(prev => [newMat, ...prev]);
     setMaterialTitle(''); setMaterialDescription(''); setMaterialTopic('');
     handleRemoveFile(e, setMaterialFile, setMaterialFileName, 'materialAttachmentFile');
     // alert("Material publicado (simulación)");
  };

  // Manejadores Alumnos (Simulación sin cambios)
  const handleSearchStudents = (e) => { e.preventDefault(); console.log("Buscar Alumnos:", searchQuery); /* ... */ };
  const handleAddStudent = (student) => { console.log("Agregar Alumno:", student.id); /* ... */ };
  const handleRemoveStudent = (student) => { console.log("Quitar Alumno:", student.id); /* ... */ };


  // --- RENDERIZADO DEL COMPONENTE ---
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

        {/* === CONTENIDO PESTAÑA AVISOS === */}
        {activeTab === 'avisos' && (
          <div className="tab-pane announcements-tab">
            {/* Columna Crear Aviso */}
            <section className="add-announcement-section card-style">
              <h3>Crear Aviso</h3>
              <form className="add-announcement-form" onSubmit={handlePublishAnnouncement}>
                 <div className="form-group">
                    <label htmlFor="announcementText">Mensaje <span className="required">*</span></label>
                    <textarea id="announcementText" className="form-input announcement-textarea" placeholder="Escribe algo para tu clase..." value={announcementText} onChange={(e) => setAnnouncementText(e.target.value)} rows="4" required/>
                 </div>
                 <div className="form-group file-input-group">
                     <label htmlFor="announcementAttachmentFile" className="file-input-label"><FaPaperclip /> Adjuntar Archivo (Opcional)</label>
                     <input type="file" id="announcementAttachmentFile" className="file-input-hidden" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, setAnnouncementFile, setAnnouncementFileName)} />
                     {announcementFileName && <div className="selected-file-display"><span>{announcementFileName}</span><button type="button" onClick={(e) => handleRemoveFile(e, setAnnouncementFile, setAnnouncementFileName, 'announcementAttachmentFile')} className="remove-file-button" title="Quitar"><FaTrashAlt /></button></div>}
                 </div>
                 <button type="submit" className="button primary-button"><FaPlusCircle className="button-icon"/> Publicar Aviso</button>
              </form>
            </section>
            {/* Columna Mostrar Avisos */}
            <section className="announcements-display-section">
               <h3>Avisos Publicados</h3>
               {announcements.length > 0 ? ( <ul className="announcements-list"> {announcements.map(announcement => (<li key={announcement.id} className="announcement-item"><div className="announcement-content"><p>{announcement.text}</p></div><div className="announcement-meta"><span>Publicado: {announcement.date}</span>{announcement.attachments && announcement.attachments.length > 0 && (<div className="announcement-attachments"><strong>Adjuntos:</strong><ul>{announcement.attachments.map((file, index) => <li key={index}><a href="#" onClick={(e)=>e.preventDefault()}>{file}</a></li>)}</ul></div>)}</div></li>))}</ul> ) : ( <p className="no-announcements">Aún no hay avisos publicados.</p> )}
            </section>
          </div>
        )}

        {/* === CONTENIDO PESTAÑA TAREAS === */}
        {activeTab === 'tareas' && (
           <div className="tab-pane tasks-tab">
             <section className="add-task-section card-style">
               <h3>Crear Tarea</h3>
               <form className="add-task-form" onSubmit={handleAddTask}>
                  {/* Campos del formulario de tarea... */}
                  <div className="form-group"><label htmlFor="taskTitle">Título <span className="required">*</span></label><input type="text" id="taskTitle" className="form-input" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} required/></div>
                  <div className="form-group"><label htmlFor="taskInstructions">Instrucciones</label><textarea id="taskInstructions" className="form-input form-textarea" value={taskInstructions} onChange={(e)=>setTaskInstructions(e.target.value)} rows="3"/></div>
                  <div className="form-group"><label htmlFor="taskTopic">Tema <span className="required">*</span></label><select id="taskTopic" className="form-input" value={taskTopic} onChange={(e)=>setTaskTopic(e.target.value)} required><option value="" disabled>-- Selecciona un tema --</option>{topics.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  <div className="form-group"><label htmlFor="taskDueDate">Fecha Límite <span className="required">*</span></label><input type="datetime-local" id="taskDueDate" className="form-input" value={taskDueDate} onChange={(e)=>setTaskDueDate(e.target.value)} required/></div>
                  <div className="form-group file-input-group">
                     <label htmlFor="taskAttachmentFile" className="file-input-label"><FaPaperclip /> Adjuntar (Opcional)</label>
                     <input type="file" id="taskAttachmentFile" className="file-input-hidden" onChange={(e) => handleFileChange(e, setTaskFile, setTaskFileName)}/>
                     {taskFileName && <div className="selected-file-display"><span>{taskFileName}</span><button type="button" onClick={(e) => handleRemoveFile(e, setTaskFile, setTaskFileName, 'taskAttachmentFile')} className="remove-file-button" title="Quitar"><FaTrashAlt /></button></div>}
                  </div>
                  <button type="submit" className="button primary-button"><FaPlusCircle className="button-icon"/> Asignar Tarea</button>
               </form>
             </section>
             <section className="tasks-display-section">
               <h3>Tareas Asignadas</h3>
               {tasks.length > 0 ? <ul className="tasks-list">{tasks.map(t=><li key={t.id}>{t.title} (Tema: {t.topic}, Vence: {t.dueDate ? new Date(t.dueDate).toLocaleString() : 'N/A'})</li>)}</ul> : <p className="no-tasks">No hay tareas asignadas.</p>}
             </section>
          </div>
        )}

        {/* === CONTENIDO PESTAÑA MATERIALES === */}
        {activeTab === 'materiales' && (
           <div className="tab-pane materials-tab">
             <section className="add-material-section card-style">
               <h3>Agregar Material</h3>
               <form className="add-material-form" onSubmit={handleAddMaterial}>
                    {/* Campos del formulario de material... */}
                  <div className="form-group"><label htmlFor="materialTitle">Título <span className="required">*</span></label><input type="text" id="materialTitle" className="form-input" value={materialTitle} onChange={(e)=>setMaterialTitle(e.target.value)} required/></div>
                  <div className="form-group"><label htmlFor="materialDescription">Descripción</label><textarea id="materialDescription" className="form-input form-textarea" value={materialDescription} onChange={(e)=>setMaterialDescription(e.target.value)} rows="3"/></div>
                  <div className="form-group"><label htmlFor="materialTopic">Tema <span className="required">*</span></label><select id="materialTopic" className="form-input" value={materialTopic} onChange={(e)=>setMaterialTopic(e.target.value)} required><option value="" disabled>-- Selecciona un tema --</option>{topics.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  <div className="form-group file-input-group">
                     <label htmlFor="materialAttachmentFile" className="file-input-label"><FaPaperclip /> Adjuntar (Opcional)</label>
                     <input type="file" id="materialAttachmentFile" className="file-input-hidden" multiple onChange={(e) => handleFileChange(e, setMaterialFile, setMaterialFileName)} />
                     {materialFileName && <div className="selected-file-display"><span>{materialFileName}</span><button type="button" onClick={(e) => handleRemoveFile(e, setMaterialFile, setMaterialFileName, 'materialAttachmentFile')} className="remove-file-button" title="Quitar"><FaTrashAlt /></button></div>}
                  </div>
                   <button type="submit" className="button primary-button"><FaPlusCircle className="button-icon"/> Publicar Material</button>
               </form>
             </section>
             <section className="materials-display-section">
               <h3>Materiales Publicados</h3>
                {materials.length > 0 ? <ul className="materials-list">{materials.map(m=><li key={m.id}>{m.title} (Tema: {m.topic}) {m.attachments?.length > 0 ? `(${m.attachments.join(', ')})`: ''}</li>)}</ul> : <p className="no-materials">No hay materiales publicados.</p>}
             </section>
          </div>
        )}

        {/* === CONTENIDO PESTAÑA ALUMNOS === */}
        {activeTab === 'alumnos' && (
           <div className="tab-pane students-tab">
            <section className="manage-students-section card-style">
              <h3><FaUsers /> Alumnos Inscritos ({enrolledStudents.length})</h3>
              {/* Subsecciones Agregar y Ver Inscritos */}
              <div className="add-student-subsection">
                 <h4>Agregar Alumno</h4>
                 <form onSubmit={handleSearchStudents} className="search-student-form">{/* ... input y botón búsqueda ... */}</form>
                 {/* ... lista resultados búsqueda ... */}
              </div>
              <div className="enrolled-students-subsection">
                 <h4>Alumnos Inscritos</h4>
                 {enrolledStudents.length > 0 ? <ul className="enrolled-students-list">{/* ... map alumnos ... */}</ul> : <p>No hay alumnos inscritos.</p>}
              </div>
            </section>
           </div>
        )}

      </main> {/* Fin de tab-content */}
    </div> // Fin de teacher-class-page
  );
}

export default TeacherClass;