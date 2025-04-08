import React, { useState } from 'react';
import { FaPaperclip, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
const api_route = require("../../config.json").api_route;

export const MaterialForm = ({ classId, onMaterialCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
    const fileInput = document.getElementById('materialAttachmentFile');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Por favor, completa el título y la descripción del material.");
      return;
    }

    try {
      const materialResponse = await fetch(`${api_route}/materiales/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          claseId: classId,
          tituloMaterial: title,
          descripcionMaterial: description
        }),
      });

      if (!materialResponse.ok) throw new Error('Error al crear el material');
      const materialData = await materialResponse.json();

      if (file) {
        const archivoFormData = new FormData();
        archivoFormData.append('file', file);
        archivoFormData.append('claseId', classId);
        archivoFormData.append('publicacionId', materialData.materialId);
        archivoFormData.append('tipoPublicacion', 'material');

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

      const newMaterial = {
        material_id: materialData.materialId,
        titulo_material: title,
        descripcion_material: description,
        fecha_publicacion: new Date().toISOString()
      };

      onMaterialCreated(newMaterial);
      
      // Reset form
      setTitle('');
      setDescription('');
      handleRemoveFile();

    } catch (error) {
      console.error("Error al crear el material:", error);
      alert("Error al crear el material.");
    }
  };

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