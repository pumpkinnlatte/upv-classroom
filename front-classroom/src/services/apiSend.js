const API_BASE_URL = 'http://localhost:3001/api/v1';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
});

export const sendAnnouncementForm = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/class/get-classes`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ claseId: classId })
  });
  if (!response.ok) throw new Error('Failed to fetch class');
  return response.json();
};

export const sendTaskForm = async (classId) => {
  const response = await fetch(`${API_BASE_URL}/class/${classId}/announcements`, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error('Failed to fetch announcements');
  return response.json();
};

export const sendMaterialForm = async (classId) => {
    const response = await fetch(`${API_BASE_URL}/class/${classId}/announcements`, {
      headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch announcements');
    return response.json();
  };
  