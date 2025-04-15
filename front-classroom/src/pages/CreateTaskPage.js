import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { TaskForm } from '../components/Forms/TaskForm';
import './FormPages.css';

function CreateTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log('ID de la clase en CreateTaskPage:', id);

  return (
    <div className="form-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>
      <h2>Crear Nueva Tarea</h2>
      <div className="form-container">
        <TaskForm 
          classId={id} 
          onTaskCreated={() => {
            console.log('Tarea creada, redirigiendo a la clase:', id);
            navigate(`/c/${id}`);
          }} 
        />
      </div>
    </div>
  );
}

export default CreateTaskPage;