import React, { useState, useEffect } from 'react';
import { FaPaperclip, FaTrashAlt, FaPlusCircle, FaCalendar } from 'react-icons/fa';
import { useTaskForm } from '../../hooks/useTaskForm';
import { getTopics } from '../../services/apiGet';

export const TaskForm = ({ classId, onTaskCreated }) => {
  const [topics, setTopics] = useState([]);
  const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit,
    points,
    setPoints,
    selectedTopic,
    setSelectedTopic
  } = useTaskForm(classId, onTaskCreated);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics(classId);

        console.log('Datos de los temas:', topicsData); // Debug log

        setTopics(topicsData);
      } catch (error) {
        console.error('Error al cargar los temas:', error);
      }
    };
    fetchTopics();
  }, [classId]);

  return (
    <section className="add-task-section card-style">
      <h3>Crear Tarea</h3>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Título <span className="required">*</span></label>
          <input
            type="text"
            id="taskTitle"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskTopic">Tema</label>
          <select
            id="taskTopic"
            className="form-input"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="">Sin tema</option>
            {topics.map((topic) => (
              <option key={`topic-${topic.tema_id}`} value={topic.tema_id}>
                {topic.nombre_tema}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="taskDescription">Descripción <span className="required">*</span></label>
          <textarea
            id="taskDescription"
            className="form-input form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe la tarea..."
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskDueDate">
            <FaCalendar /> Fecha de entrega
          </label>
          <input
            type="datetime-local"
            id="taskDueDate"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="points">Puntos</label>
          <input
            id="points"
            type="number"
            min="0"
            className="form-input"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="form-group file-input-group">
          <label htmlFor="taskAttachmentFile" className="file-input-label">
            <FaPaperclip /> Adjuntar Archivo (Opcional)
          </label>
          <input
            type="file"
            id="taskAttachmentFile"
            className="file-input-hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf,.doc,.docx"
          />
          {fileName && (
            <div className="selected-file-display">
              <span>{fileName}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="remove-file-button"
                title="Quitar archivo"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="button primary-button">
          <FaPlusCircle className="button-icon"/> Crear Tarea
        </button>
      </form>
    </section>
  );
};