import { useState } from 'react';
import { sendAnnouncementData, sendFileData } from '../services/apiSend';

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

        //Se serializan los datos del anuncio
        const avisoData = {
            claseId: classId,
            titulo: title,
            descripcion: text,
            fechaPublicacion: "",
            hasFile: file ? 1 : 0
        }

        console.log("Datos del aviso:", avisoData);

        //Se envian los datos del anuncio al servidor
        const newAvisoData = await sendAnnouncementData(avisoData);

        //Se verifica si el anuncio fue creado correctamente
        if (!newAvisoData) {
            alert("Error al crear el aviso.");
            return;
        }

        console.log("Nuevo aviso creado:", newAvisoData);

        //Si existe un archivo
        if (file) {

            console.log("aviso idd arrchiiivo", newAvisoData.avisoId);
            
            // Create FormData to send the file
            const formData = new FormData();
            formData.append('file', file);
            formData.append('publicacionId', newAvisoData.avisoId); 
            formData.append('tipoPublicacion', 'aviso');
            

            const fileResponse = await sendFileData(formData);
            console.log("File upload response:", fileResponse);
        }
        

      onAnnouncementCreated(newAvisoData);
      
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