import { useState } from 'react';
const api_route = require("../config.json").api_route;

export const useAnnouncementForm = (classId, onAnnouncementCreated) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
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
    const fileInput = document.getElementById('announcementAttachmentFile');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      alert("Por favor, completa el título y el mensaje del aviso.");
      return;
    }

    try {
      const avisoResponse = await fetch(`${api_route}/announcements/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          clase_id: classId,
          titulo: title,
          descripcion: text
        }),
      });

      if (!avisoResponse.ok) throw new Error('Error al crear el aviso');
      const avisoData = await avisoResponse.json();

      if (file) {
        const archivoFormData = new FormData();
        archivoFormData.append('file', file);
        archivoFormData.append('claseId', classId);
        archivoFormData.append('publicacionId', avisoData.avisoId);
        archivoFormData.append('tipoPublicacion', 'aviso');

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

      const newAnnouncement = {
        aviso_id: avisoData.avisoId,
        titulo_aviso: title,
        descripcion_aviso: text,
        fecha_publicacion: new Date().toISOString(),
      };

      onAnnouncementCreated(newAnnouncement);
      
      // Reset form
      setTitle('');
      setText('');
      handleRemoveFile();
      
    } catch (error) {
      console.error("Error al publicar el aviso:", error);
      alert("Error al publicar el aviso.");
    }
  };

  return {
    title,
    setTitle,
    text,
    setText,
    file,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  };
};