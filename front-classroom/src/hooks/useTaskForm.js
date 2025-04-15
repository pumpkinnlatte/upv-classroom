import { useState } from 'react';
import { sendTaskData, sendFileData } from '../services/apiSend';

export const useTaskForm = (classId, onTaskCreated) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState(100);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

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
      console.log('ClassId recibido:', classId); // Debug log
      
      const taskData = {
        tituloTarea: title.trim(),
        descripcionTarea: description.trim(),
        puntosMax: parseInt(points, 10),
        fechaPublicacion: new Date().toISOString(),
        fechaLimite: dueDate || null,
        temaId: selectedTopic || null,
        clase_id: parseInt(classId, 10), // Ensure it's a number
        hasFile: file ? 1 : 0
      };

      console.log('Datos de la tarea a enviar:', taskData); // Debug log

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
        fecha_publicacion: new Date().toISOString(),
        puntos: points
      });

      setTitle('');
      setDescription('');
      setDueDate('');
      setPoints(100);
      handleRemoveFile();

    } catch (error) {
      console.error("Error al crear la tarea:", error);
      alert(error.message || "Error al crear la tarea.");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    points,
    setPoints,
    file,
    fileName,
    selectedTopic,
    setSelectedTopic,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  };
};