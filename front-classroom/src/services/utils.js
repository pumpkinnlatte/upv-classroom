import { jwtDecode } from "jwt-decode";

// Función para formatear la fecha
export const formatDate = (date, includeTime = true) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // This adds AM/PM format
    })
  };
  return new Date(date).toLocaleDateString('es-ES', options);
};

export const validateToken = () => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    return { isValid: false, userData: null };
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('accessToken');
      return { isValid: false, userData: null };
    }

    return { 
      isValid: true, 
      userData: decoded // Contiene todos los datos del token (id, email, tipo de usuario, etc)
    };
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return { isValid: false, userData: null };
  }
};