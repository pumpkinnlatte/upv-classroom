import React from 'react';
import { useAnnouncementForm } from '../../hooks/useAnnouncementForm';
import { FaPaperclip, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

export const AnnouncementForm = ({ classId, onAnnouncementCreated }) => {
  const {
    title,
    setTitle,
    text,
    setText,
    file,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  } = useAnnouncementForm(classId, onAnnouncementCreated);

  return (
    <section className="add-announcement-section card-style">
      <h3>Crear Aviso</h3>
      <form className="add-announcement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="announcementTitle">Titulo <span className="required">*</span></label>
          <input
            type="text"
            id="announcementTitle"
            className="form-input announcement-textarea"
            placeholder="Escribe un titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="announcementText">Mensaje <span className="required">*</span></label>
          <textarea
            id="announcementText"
            className="form-input announcement-textarea"
            placeholder="Escribe algo para tu clase..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="form-group file-input-group">
          <label htmlFor="announcementAttachmentFile" className="file-input-label">
            <FaPaperclip /> Adjuntar Archivo (Opcional)
          </label>
          <input
            type="file"
            id="announcementAttachmentFile"
            className="file-input-hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          {fileName && (
            <div className="selected-file-display">
              <span>{fileName}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile()}
                className="remove-file-button"
                title="Quitar"
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="button primary-button">
          <FaPlusCircle className="button-icon"/> Publicar Aviso
        </button>
      </form>
    </section>
  );
};