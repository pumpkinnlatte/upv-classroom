import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css';

export function TaskList({ tasks, classId }) {
  const navigate = useNavigate();

  if (!tasks || tasks.length === 0) {
    return <p className="no-tasks">No hay tareas disponibles</p>;
  }

  const handleTaskClick = (taskId) => {
    navigate(`/c/${classId}/t/${taskId}`);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div 
          key={task.tarea_id} 
          className="task-item"
          onClick={() => handleTaskClick(task.tarea_id)}
        >
          <div className="task-meta">
            <h3>{task.titulo_tarea}</h3>
            <p>{task.descripcion}</p>
            <p className="task-date">
              Publicado: {new Date(task.fecha_publicacion).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}