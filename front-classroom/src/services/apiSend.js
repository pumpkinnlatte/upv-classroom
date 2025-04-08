const API_BASE_URL = require("../config.json").api_route;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
});

export const sendAnnouncementData = async (avisoData) => {
  const response = await fetch(`${API_BASE_URL}/announcements/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(
        { 
            clase_id: avisoData.claseId,  
            titulo: avisoData.titulo,
            descripcion: avisoData.descripcion,
            fechaPublicacion: avisoData.fechaPublicacion,
        })
  });
  if (!response.ok) throw new Error('Error al crear el aviso');
  return response.json();
};

export const sendFileData = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/archivos/subir-archivo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData
    });
    if (!response.ok) throw new Error('Error al subir el archivo');
    return response.json();
  };

export const sendTask = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/create`, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al crear la tarea');
  return response.json();
};

export const sendMaterialForm = async (classId) => {
    const response = await fetch(`${API_BASE_URL}/materiales/create`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Error al crear el material');
    return response.json();
  };
  