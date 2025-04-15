import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './Navigation.css';
import { logout } from '../../services/apiSend';

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isLoggedIn = !!token;
  let userRole = '';
  
  if (isLoggedIn) {
    const decoded = jwtDecode(token);
    userRole = decoded.tipoUsuario;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error durante el logout:', error);
      // Still clear local storage and redirect even if the server request fails
      navigate('/login');
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav className="navigation">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          UPV Classroom
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <button onClick={handleLogout} className="nav-link logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;