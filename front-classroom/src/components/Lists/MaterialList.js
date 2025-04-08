import React from 'react';
import { FaFile, FaCalendarAlt, FaDownload } from 'react-icons/fa';

export const MaterialList = ({ materials }) => {
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
    <section className="materials-display-section">
      <h3>Materiales del Curso</h3>
      {materials.length > 0 ? (
        <ul className="materials-list">
          {materials.map(material => (
            <li key={material.material_id} className="material-item">
              <div className="material-header">
                <h4>{material.titulo_material}</h4>
                <span className="material-date">
                  <FaCalendarAlt /> Publicado: {formatDate(material.fecha_publicacion)}
                </span>
              </div>
              <div className="material-content">
                <p>{material.descripcion_material}</p>
              </div>
              {material.attachments && material.attachments.length > 0 && (
                <div className="material-attachments">
                  <strong><FaFile /> Archivos:</strong>
                  <ul>
                    {material.attachments.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <FaDownload /> {file.name}
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
        <p className="no-materials">No hay materiales disponibles.</p>
      )}
    </section>
  );
};