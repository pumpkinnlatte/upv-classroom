const API_BASE_URL = require("../config.json").api_route;

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
});

export const getClass = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/class/get-classes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch class');
  return response.json();
};

export const getAnnouncements = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/announcements/get-avisos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch announcements');
  return response.json();
};

export const getTasks = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/get-tareas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const getTopics = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/class/get-topics`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch topics');
  return response.json();
}

export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/get-tarea-by-id`, {
    method: 'POST',
    headers: getHeaders(),
    body  : JSON.stringify({ tareaId: taskId })
  });
  if (!response.ok) throw new Error('Failed to fetch task details');
  return response.json();
};

export const getMaterials = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/materiales/get-materiales`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch materials');
  return response.json();
};

export const getStudents = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/class/get-alumnos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch students');
  return response.json();
};

export const getClassByUser = async () => {
  const response = await fetch(`${API_BASE_URL}/class/get-classes`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al obtener las clases');
  return response.json();
};

export const getEntregasByTarea = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/get-entregas`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ tareaId: taskId })
  });
  if (!response.ok) throw new Error('Failed to fetch task submissions');
  return response.json();
};

export const getEntregaById = async (entregaId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/get-entrega-by-id`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ entregaId })
  });
  if (!response.ok) throw new Error('Error al obtener la entrega');
  return response.json();
}

export const getAvisoById = async (avisoId) => {
  const response = await fetch(`${API_BASE_URL}/announcements/get-aviso-by-id`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ avisoId })
  });
  if (!response.ok) throw new Error('Error al obtener el aviso');
  return response.json();
}

export const getMaterialById = async (materialId) => {
  const response = await fetch(`${API_BASE_URL}/materiales/get-material-by-id`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ materialId })
  });
  if (!response.ok) throw new Error('Error al obtener el material');
  return response.json();
}

export const getArchivos = async (publicacionId, tipoPublicacion) => {
  const response = await fetch(`${API_BASE_URL}/archivos/get-archivos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ publicacionId, tipoPublicacion })
  });
  if (!response.ok) throw new Error('Error al obtener los archivos');
  return response.json();
}

export const downloadArchivo = async (classId, year, filename) => {
  const response = await fetch(`${API_BASE_URL}/archivos/download/${classId}/${year}/${filename}`, {
    method: 'GET',
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Error al descargar el archivo');
  return response.blob();
};