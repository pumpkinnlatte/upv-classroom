// src/pages/CreateClassPage.js - SIN CAMBIOS EXCEPTO BOTÓN REGRESAR
import React, { useState, useEffect } from 'react';
// Añadimos imports para el botón de regreso
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Asegúrate de tener react-icons
// ---------------------------------------
import './CreateClassPage.css'; // Asegúrate que este archivo CSS exista

function CreateClassPage() {
  const navigate = useNavigate(); // Hook para navegación (Regresar)

  // Estados para los campos del formulario (sin cambios)
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [career, setCareer] = useState('');
  const [semester, setSemester] = useState('');
  const [careerOptions, setCareerOptions] = useState([]);

  // Simulación carga de carreras (sin cambios)
  useEffect(() => {
    const fetchedCareers = [
      { id: 'ITI', name: 'Ing. en Tecnologías de la Información' },
      { id: 'IM', name: 'Ing. Mecánica' },
      { id: 'IMT', name: 'Ing. Mecatrónica' },
      { id: 'LAGYE', name: 'Lic. en Admón. y Gestión de PyMEs' }
    ];
    setCareerOptions(fetchedCareers);
  }, []);

  // Opciones de cuatrimestre (sin cambios)
  const semesterOptions = ['1ro', '2do', '3ro', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo'];

  // Manejador Submit (sin cambios)
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!className || !career || !semester) {
        alert("Por favor, completa todos los campos obligatorios (Nombre, Carrera, Cuatrimestre).");
        return;
    }
    const newClassData = { name: className, description, groupCode, careerId: career, semester };
    console.log("Enviando datos de nueva clase:", newClassData);
    // Lógica API iría aquí...
    alert("¡Clase creada exitosamente! (Simulación)");
    navigate('/teacher/home');
  };

  // Manejador Cancelar (usamos navigate -1 para regresar)
  const handleCancel = () => {
    navigate(-1); // Regresa a la página anterior (TeacherHome)
  };

  return (
    <div className="create-class-page">
       {/* === BOTÓN DE REGRESO AÑADIDO === */}
       <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Regresar
       </button>
       {/* === FIN BOTÓN DE REGRESO === */}

      <div className="form-container">
        <h2 className="page-title">Crear Nueva Clase</h2>
        <form className="create-class-form" onSubmit={handleSubmit}>

          {/* Nombre de la Clase */}
          <div className="form-group">
            <label htmlFor="className">Nombre de la Clase <span className="required">*</span></label>
            <input type="text" id="className" className="form-input" value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Ej: Cálculo Diferencial" required />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="description">Descripción (Opcional)</label>
            <textarea id="description" className="form-input form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Fundamentos del cálculo para ingeniería" rows="3" />
          </div>

          {/* Código del Grupo */}
          <div className="form-group">
            <label htmlFor="groupCode">Código del Grupo (Opcional)</label>
            <input type="text" id="groupCode" className="form-input" value={groupCode} onChange={(e) => setGroupCode(e.target.value)} placeholder="Ej: S1-6A" />
          </div>

          {/* Carrera */}
          <div className="form-group">
            <label htmlFor="career">Carrera <span className="required">*</span></label>
            <select id="career" className="form-input" value={career} onChange={(e) => setCareer(e.target.value)} required>
              <option value="" disabled>-- Selecciona una carrera --</option>
              {careerOptions.map(option => ( <option key={option.id} value={option.id}>{option.name}</option> ))}
            </select>
          </div>

          {/* Cuatrimestre */}
          <div className="form-group">
            <label htmlFor="semester">Cuatrimestre <span className="required">*</span></label>
            <select id="semester" className="form-input" value={semester} onChange={(e) => setSemester(e.target.value)} required>
              <option value="" disabled>-- Selecciona un cuatrimestre --</option>
              {semesterOptions.map(option => ( <option key={option} value={option}>{option}</option> ))}
            </select>
          </div>

          {/* Botones de Acción */}
          <div className="form-actions">
            <button type="button" className="button secondary-button" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="button primary-button">
              Crear Clase
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreateClassPage;