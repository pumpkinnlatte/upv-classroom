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
            hasFile: avisoData.hasFile
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
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Error al crear la tarea');
  return response.json();
};


export const sendMaterialData = async (materialData) => {
  const response = await fetch(`${API_BASE_URL}/materiales/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(materialData)
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el material');
  }
  
  return response.json();
};


export const sendTopicData = async (topicData) => {
  const response = await fetch(`${API_BASE_URL}/class/create-topic`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(topicData)
  });
  
  if (!response.ok) {
    throw new Error('Error al crear el tema');
  }
  
  return response.json();
}

export const logout = async () => {

  const response=  await fetch(`${API_BASE_URL}/account/logout`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refreshToken')
    })
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }
  return response.json();
};



export const actualizarCalificacion = async (submissionId, newGrade) => {
  const response = await fetch(`${API_BASE_URL}/tareas/calificar-tarea`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({
        entregaId: submissionId,
        calificacion: newGrade
      })
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la calificacion');
  }

  return response.json();
};

