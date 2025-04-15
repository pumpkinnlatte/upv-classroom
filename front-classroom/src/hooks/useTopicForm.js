import { useState } from 'react';
import { sendTopicData } from '../services/apiSend';
import { getTopics } from '../services/apiGet';

export const useTopicForm = (classId, onSuccess) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const checkTopicExists = async (topicName) => {
    try {
      
      const topics = await getTopics(classId);

      // Verify that topics is an array and has items
      if (!Array.isArray(topics)) {
        console.error('La respuesta no es un array:', topics);
        return false;
      }

      return topics.some(topic => 
        topic.nombre_tema.toLowerCase() === topicName.toLowerCase()
      );
    } catch (error) {
      console.error('Error al verificar temas:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Por favor, ingresa un título para el tema.");
      return;
    }

    try {
      const exists = await checkTopicExists(title.trim());
      if (exists) {
        alert("Ya existe un tema con este nombre en la clase.");
        return;
      }

      const topicData = {
        claseId: classId,
        nombreTema: title.trim(),  
        descripcionTema: description.trim()
      };

      console.log('Datos del tema a enviar:', topicData);

      const newTopic = await sendTopicData(topicData);

      setTitle('');
      setDescription('');
      
      onSuccess?.(newTopic);
      alert("Tema creado correctamente.");

    } catch (error) {
      console.error('Error:', error);
      alert(error.message || "Error al crear el tema");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    handleSubmit
  };
};