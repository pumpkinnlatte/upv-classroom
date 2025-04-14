import React from 'react';
import { FaPaperclip, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { useMaterialForm } from '../../hooks/useMaterialForm';

export const MaterialForm = ({ classId, onMaterialCreated }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    file,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  } = useMaterialForm(classId, onMaterialCreated);

  return (
    <section className="add-material-section card-style">
      <h3>Subir Material</h3>
      <form className="add-material-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="materialTitle">Título <span className="required">*</span></label>
          <input
            type="text"
            id="materialTitle"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del material"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="materialDescription">Descripción <span className="required">*</span></label>
          <textarea
            id="materialDescription"
            className="form-input form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el material..."
            rows="4"
            required
          />
        </div>

        <div className="form-group file-input-group">
          <label htmlFor="materialAttachmentFile" className="file-input-label">
            <FaPaperclip /> Adjuntar Archivo
          </label>
          <input
            type="file"
            id="materialAttachmentFile"
            className="file-input-hidden"
            onChange={handleFileChange}
            accept="*/*"
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
          <FaPlusCircle className="button-icon"/> Subir Material
        </button>
      </form>
    </section>
  );
};