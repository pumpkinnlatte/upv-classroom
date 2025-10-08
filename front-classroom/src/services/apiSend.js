import { jwtDecode } from "jwt-decode";

const API_BASE_URL = require("../config.json").api_route;


const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
});


export const sendAnnouncementData = async (avisoData) => {
  const response = await fetch(`${API_BASE_URL}/announcements/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(avisoData)
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

export const sendClassData = async (classData) => {
  const response = await fetch(`${API_BASE_URL}/class/create`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(classData)
  });

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

export const loginService = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    if (!token) throw new Error('No refresh token available');

    const response = await fetch(`${API_BASE_URL}/account/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken: token })
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    return response.json();
};

export async function subirEntrega(taskId, entregaData) {
  try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
          throw new Error('No hay token de autenticación');
      }

      const decoded = jwtDecode(token);
      const alumnoId = decoded.userId;

      const requestData = {
          tareaId: parseInt(taskId),
          alumnoId: parseInt(alumnoId),
          fecha_entrega: new Date().toISOString(),
          estado: "entregado",
          calificacion: "",
          hasFile: entregaData.hasFile
      };

      const response = await fetch(`${API_BASE_URL}/tareas/entregar-tarea`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al subir la entrega');
      }

      const data = await response.json();
      return data;
      
  } catch (error) {
      console.error('Error en subirEntrega:', error);
      throw error;
  }
}

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

export const joinClass = async (codigoClase) => {
  const response = await fetch(`${API_BASE_URL}/class/join-by-code`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(codigoClase)
  });
  
  if (!response.ok) {
    throw new Error('Error al unirse a la clase');
  }
  return response.json();
};

export const addAlumno = async (alumnoData) => {
  const response = await fetch(`${API_BASE_URL}/class/add-alumno`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(alumnoData)
  });
  
  if (!response.ok) {
    throw new Error('Error al agregar el alumno');
  }
  return response.json();
}
