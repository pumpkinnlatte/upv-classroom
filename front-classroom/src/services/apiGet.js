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

export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tareas/get-tarea-by-id`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ tareaId: taskId })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch task');
  return data;
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