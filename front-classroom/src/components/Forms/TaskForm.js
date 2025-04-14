import React from 'react';
import { FaPaperclip, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { useTaskForm } from '../../hooks/useTaskForm';

export const TaskForm = ({ classId, onTaskCreated }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    file,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  } = useTaskForm(classId, onTaskCreated);

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
          <label htmlFor="taskDueDate">Fecha de entrega</label>
          <input
            type="datetime-local"
            id="taskDueDate"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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