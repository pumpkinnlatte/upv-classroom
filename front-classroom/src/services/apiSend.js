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

export const sendTaskData = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tareas/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(
      { 
          tituloTarea: taskData.tituloTarea,  
          descripcionTarea: taskData.descripcionTarea,
          fechaPublicacion: "",
          fechaLimite: taskData.fechaLimite,
          temaId: taskData.temaId,
          claseId: taskData.classId
      })
  });
  if (!response.ok) throw new Error('Error al crear la tarea');
  return response.json();
};


export const sendMaterialData = async (materialData) => {
  const response = await fetch(`${API_BASE_URL}/materiales/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(
      { 
        tituloMaterial: materialData.tituloMaterial,  
        descripcionMaterial: materialData.descripcionMaterial,
        fechaPublicacion: materialData.fechaPublicacion,
        temaId: "",
        claseId: materialData.claseId
      })
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el material');
  }
  
  return response.json();
};
