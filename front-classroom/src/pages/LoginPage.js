// src/pages/LoginPage.js - SIMPLIFICADO
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
// Quitamos importación de iconos si ya no los usamos
// import { FaUser, FaLock } from 'react-icons/fa';

function LoginPage() {
  // Ya no necesitamos estado para 'role' ni 'teacherKey'
  const navigate = useNavigate();

  // Estados solo para usuario y contraseña
  const [username, setUsername] = useState(''); // Puede ser email o matrícula
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensaje de error

  const handleLogin = async (event) => {
     event.preventDefault();
     setError(''); // Limpia errores previos

    // --- LÓGICA DE LOGIN (Simulación Mejorada) ---
    // Enviar 'username' y 'password' a tu API backend (POST /api/auth/login)
    console.log("Enviando credenciales:", { username, password });

    // Simulación de llamada a API
    try {
        // const response = await fetch('/api/auth/login', { method: 'POST', ... });
        // if (!response.ok) { throw new Error('Usuario o contraseña inválidos'); }
        // const userData = await response.json(); // Espera { success: true, role: 'maestro' | 'alumno', token: '...' }

        // --- SIMULACIÓN ---
        let simulatedRole = null;
        if (username === 'profesor@upv.edu' && password === 'password') {
            simulatedRole = 'teacher';
        } else if (username === 'alumno@upv.edu' && password === 'password') {
            simulatedRole = 'student';
        }
        // --- FIN SIMULACIÓN ---

        if (simulatedRole) {
           console.log("Login exitoso como:", simulatedRole);
           // Aquí guardarías el token de autenticación (ej: en localStorage)
           // localStorage.setItem('authToken', userData.token);

           // Redirige según el ROL devuelto por la API (o la simulación)
           if (simulatedRole === 'teacher') {
             navigate("/teacher/home");
           } else { // Asume alumno si no es maestro
             navigate("/student/home");
           }
        } else {
            // Simulación de error de credenciales
            throw new Error('Usuario o contraseña inválidos.');
        }

    } catch (err) {
        console.error("Error en login:", err);
        setError(err.message || 'Ocurrió un error al iniciar sesión.'); // Muestra mensaje de error
    }
    // --- FIN LÓGICA DE LOGIN ---
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
              type="text"
              placeholder="Ingrese su email o matrícula"
              className="form-input" // Clase base
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-group">
             {/* Quitamos icono y clases relacionadas */}
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className="form-input" // Clase base
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* --- YA NO HAY SELECTOR DE ROL NI CAMPO DE CLAVE --- */}

          {/* Mensaje de Error */}
          {error && (
             <p className="error-message">{error}</p>
          )}


          {/* Enlace Olvidé Contraseña */}
          <div className="login-links-container">
             <a href="#" onClick={handleForgotPassword} className="forgot-password-link">
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