const API_BASE_URL = 'http://localhost:3001/api/v1';

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