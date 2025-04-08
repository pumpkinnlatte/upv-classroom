// src/components/AnnouncementSection.js
import React from 'react';
import AnnouncementForm from '../Forms/AnnouncementForm';

function AnnouncementSection({ announcements }) {
  return (
    <div className="tab-pane announcements-tab">
      {/* Columna Crear Aviso */}
      <section className="add-announcement-section card-style">
        <AnnouncementForm />
      </section>
      {/* Columna Mostrar Avisos */}
      <section className="announcements-display-section">
        <h3>Avisos Publicados</h3>
        {announcements.length > 0 ? (
          <ul className="announcements-list">
            {announcements.map(announcement => (
              <li key={announcement.aviso_id} className="announcement-item">
                <div className="announcement-content">
                  <p>{announcement.descripcion_aviso}</p>
                </div>
                <div className="announcement-meta">
                  <span>Publicado: {announcement.fecha_publicacion}</span>
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="announcement-attachments">
                      <strong>Adjuntos:</strong>
                      <ul>
                        {announcement.attachments.map((file, index) => (
                          <li key={index}><a href="#" onClick={(e) => e.preventDefault()}>{file}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-announcements">Aún no hay avisos publicados.</p>
        )}
      </section>
    </div>
  );
}

export default AnnouncementSection;