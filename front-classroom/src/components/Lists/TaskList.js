import React from 'react';
import { FaFile, FaCalendarAlt, FaClock } from 'react-icons/fa';

export const TaskList = ({ tasks }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="tasks-display-section">
      <h3>Tareas Asignadas</h3>
      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map(task => (
            <li key={task.tarea_id} className="task-item">
              <div className="task-header">
                <h4>{task.titulo_tarea}</h4>
                <div className="task-meta">
                  <span className="task-date">
                    <FaCalendarAlt /> Publicado: {formatDate(task.fecha_publicacion)}
                  </span>
                  {task.fecha_limite && (
                    <span className="task-due-date">
                      <FaClock /> Entrega: {formatDate(task.fecha_limite)}
                    </span>
                  )}
                </div>
              </div>
              <div className="task-content">
                <p>{task.descripcion_tarea}</p>
              </div>
              {task.attachments && task.attachments.length > 0 && (
                <div className="task-attachments">
                  <strong><FaFile /> Archivos adjuntos:</strong>
                  <ul>
                    {task.attachments.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">No hay tareas asignadas.</p>
      )}
    </section>
  );
};