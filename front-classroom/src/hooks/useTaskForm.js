import { useState } from 'react';
import { sendTaskData, sendFileData } from '../services/apiSend';

export const useTaskForm = (classId, onTaskCreated) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
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
    const fileInput = document.getElementById('taskAttachmentFile');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Por favor, completa el título y la descripción de la tarea.");
      return;
    }

    try {
      const taskData = {
        tituloTarea: title,
        descripcionTarea: description,
        fechaPublicacion: "",
        fechaLimite: dueDate || null,
        temaId: "",
        classId: classId, 
      };

      const newTaskData = await sendTaskData(taskData);

      if (!newTaskData) {
        throw new Error('Error al crear la tarea');
      }

      alert("Tarea creada correctamente.");

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('publicacionId', newTaskData.tareaId);
        formData.append('tipoPublicacion', 'tarea');

        const fileResponse = await sendFileData(formData);
        if (!fileResponse) {
          throw new Error('Error al subir el archivo');
        }
      }

      onTaskCreated && onTaskCreated({
        tarea_id: newTaskData.tareaId,
        titulo_tarea: title,
        descripcion_tarea: description,
        fecha_limite: dueDate,
        fecha_publicacion: new Date().toISOString()
      });

      setTitle('');
      setDescription('');
      setDueDate('');
      handleRemoveFile();

    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert("Error al crear la tarea.");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    file,
    fileName,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  };
};