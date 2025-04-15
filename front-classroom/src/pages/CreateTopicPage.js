import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { TopicForm } from '../components/Forms/TopicForm';
import './FormPages.css';

function CreateTopicPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>
      <h2>Crear Nuevo Tema</h2>
      <div className="form-container">
        <TopicForm classId={id} onSuccess={() => navigate(`/c/${id}`)} />
      </div>
    </div>
  );
}

export default CreateTopicPage;