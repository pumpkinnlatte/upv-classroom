import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import { useAuth, getUserRole } from '../context/AuthContext';
import '../css/login.css';

const API_BASE_URL = require("../config.json").api_route;


const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const role = getUserRole();
      if (role) {
        navigate('/');
      }
    }
  }, [navigate]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const userRole = getUserRole(data.accessToken);
        await login(data.accessToken, data.refreshToken, userRole);
        navigate('/');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="content">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        <div className='u-examples'>
            <div>
              <h4>Student User Account</h4>
              <p>studentuser@university.com</p>
              <p>password123</p>
            </div>

          <div>
            <h4>Professor User Account</h4>
            <p>professoruser@university.com</p>
            <p>password123</p>
          </div>
        </div>

        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;