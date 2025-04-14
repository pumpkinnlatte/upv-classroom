import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './TeacherCreateClass.css';

const api_route = require("../config.json").api_route;

function TeacherCreateClass() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_clase: '',
    carrera: '',
    descripcion_clase: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${api_route}/class/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al crear la clase');
      }

      const data = await response.json();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-class-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>

      <div className="create-class-container">
        <h2>Crear Nueva Clase</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="create-class-form">
          <div className="form-group">
            <label htmlFor="nombre_clase">Nombre de la Clase<span className="required">*</span></label>
            <input
              type="text"
              id="nombre_clase"
              name="nombre_clase"
              className="form-input"
              value={formData.nombre_clase}
              onChange={handleInputChange}
              required
              placeholder="Ej: Matemáticas Discretas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carrera">Carrera<span className="required">*</span></label>
            <input
              type="text"
              id="carrera"
              name="carrera"
              className="form-input"
              value={formData.carrera}
              onChange={handleInputChange}
              required
              placeholder="Ej: Ingeniería Informática"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion_clase">Descripción</label>
            <textarea
              id="descripcion_clase"
              name="descripcion_clase"
              className="form-input form-textarea"
              value={formData.descripcion_clase}
              onChange={handleInputChange}
              placeholder="Describe tu clase..."
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Clase'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherCreateClass;