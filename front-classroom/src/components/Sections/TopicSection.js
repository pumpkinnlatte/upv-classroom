import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTasks, FaFolderOpen } from 'react-icons/fa';
import './TopicSection.css';

export const TopicSection = ({ topic, tasks, materials }) => {
  const navigate = useNavigate();

  const handleTaskClick = (taskId) => {
    navigate(`/c/${topic?.claseId}/t/${taskId}`);
  };

  return (
    <div className="topic-section">
      <h3 className="topic-title">{topic ? topic.nombre_tema : 'Sin tema'}</h3>
      {topic?.descripcionTema && <p className="topic-description">{topic.descripcionTema}</p>}
      
      <div className="topic-content">
        {tasks.length > 0 && (
          <div className="tasks-group">
            <h4><FaTasks /> Tareas</h4>
            <div className="tasks-list">
              {tasks.map(task => (
                <div 
                  key={task.tarea_id} 
                  id={`tarea-${task.tarea_id}`}
                  className="task-item"
                  onClick={() => handleTaskClick(task.tarea_id)}
                >
                  <div className="task-header">
                    <FaTasks className="task-icon" />
                    <h5>{task.titulo_tarea}</h5>
                  </div>
                  {task.fecha_limite && (
                    <p className="due-date">Fecha límite: {new Date(task.fecha_limite).toLocaleDateString()}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {materials.length > 0 && (
          <div className="materials-group">
            <h4><FaFolderOpen /> Materiales</h4>
            <div className="materials-list">
              {materials.map(material => (
                <div 
                  key={material.material_id} 
                  id={`material-${material.material_id}`}
                  className="material-item"
                >
                  <div className="material-header">
                    <FaFolderOpen className="material-icon" />
                    <h5>{material.titulo_material}</h5>
                  </div>
                  <p>{material.descripcion_material}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};