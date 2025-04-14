import React from 'react';

export const AnnouncementsList = ({ announcements}) => {
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
    <section className="announcements-display-section">
      <h3>Avisos Publicados</h3>
      {announcements.length > 0 ? (
        <ul className="announcements-list">
          {announcements.map(announcement => (
            <li key={announcement.aviso_id} className="announcement-item">
              <div className="announcement-header">
                <h4>{announcement.titulo_aviso}</h4>
                <span className="announcement-date">
                  {formatDate(announcement.fecha_publicacion)}
                </span>
              </div>
              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="announcement-attachments">
                  <strong>Adjuntos:</strong>
                  <ul>
                    {announcement.attachments.map((file, index) => (
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
        <p className="no-announcements">Aún no hay avisos publicados.</p>
      )}
    </section>
  );
};