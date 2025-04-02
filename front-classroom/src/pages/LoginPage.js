// src/pages/LoginPage.js - SIMPLIFICADO
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import './LoginPage.css';
const api_route = require("../config.json").api_route; //Importar Ruta de la API


function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: ""
  });

  const [error, setError] = useState(""); // Estado para mensaje de error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpia errores previos

    try {
      const response = await fetch(`${api_route}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username:formData.username,
          password: formData.password 
       }),
      });

      const data = await response.json();

      if (response.ok) {

        setError("Usuario ha iniciado sesion con éxito.");
        setFormData({ username: "", password: ""});

        //Guardar en el localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        const decoded = jwtDecode(data.accessToken);

        if (decoded.tipoUsuario === "profesor") {
            navigate("/teacher/home");
        } else {
            navigate("/student/home");
        }

      } else {
        setError(data.error || "Error en el inicio de sesión.");
        console.log(data);
      }


    } catch (error) {
      setError("Error al conectar con el servidor");
    }
    
  };

  // Placeholder para contraseña olvidada
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Funcionalidad 'Olvidé mi contraseña' aún no implementada.");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
          {/* Usuario (Email o Matrícula) */}
          <div className="form-group">
             {/* Quitamos icono y clases relacionadas */}
            <label htmlFor="username">Email o Matrícula:</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Ingrese su email o matrícula"
              className="form-input" // Clase base
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-group">
             {/* Quitamos icono y clases relacionadas */}
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              name='password'
              type="password"
              placeholder="Ingrese su contraseña"
              className="form-input" // Clase base
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
             <p className="error-message">{error}</p>
          )}


          {/* Enlace Olvidé Contraseña */}
          <div className="login-links-container">
             <a href="/" onClick={handleForgotPassword} className="forgot-password-link">
               ¿Olvidaste tu contraseña?
             </a>
             {/* No hay enlace de registro */}
          </div>


          {/* Botón Iniciar Sesión */}
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;