import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { MaterialForm } from '../components/Forms/MaterialForm';
import './FormPages.css';

function CreateMaterialPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="form-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>
      <h2>Crear Nuevo Material</h2>
      <div className="form-container">
        <MaterialForm classId={id} onSuccess={() => navigate(`/c/${id}`)} />
      </div>
    </div>
  );
}

export default CreateMaterialPage;