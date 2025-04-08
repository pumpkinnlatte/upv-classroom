import React, { useState } from 'react';
import { FaPaperclip, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
const api_route = require("../../config.json").api_route;

export const TaskForm = ({ classId, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    const fileInput = document.getElementById('taskAttachmentFile');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Por favor, completa el título y la descripción de la tarea.");
      return;
    }

    try {
      const tareaResponse = await fetch(`${api_route}/tareas/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          claseId: classId,
          tituloTarea: title,
          descripcionTarea: description,
          fechaLimite: dueDate || null
        }),
      });

      if (!tareaResponse.ok) throw new Error('Error al crear la tarea');
      const tareaData = await tareaResponse.json();

      if (file) {
        const archivoFormData = new FormData();
        archivoFormData.append('file', file);
        archivoFormData.append('claseId', classId);
        archivoFormData.append('publicacionId', tareaData.tareaId);
        archivoFormData.append('tipoPublicacion', 'tarea');

        const archivoResponse = await fetch(`${api_route}/archivos/subir-archivo`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: archivoFormData,
        });

        if (!archivoResponse.ok) {
          console.error('Error al subir el archivo');
        }
      }

      const newTask = {
        tarea_id: tareaData.tareaId,
        titulo_tarea: title,
        descripcion_tarea: description,
        fecha_limite: dueDate,
        fecha_publicacion: new Date().toISOString()
      };

      onTaskCreated(newTask);

      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
      handleRemoveFile();

    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Error al crear la tarea.");
    }
  };

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