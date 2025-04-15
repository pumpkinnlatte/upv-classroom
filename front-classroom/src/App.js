import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import CreateClassPage from './pages/CreateClassPage';
import './App.css';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              } 
            />
            <Route
              path="/c/:id"
              element={
                <PrivateRoute>
                  <ClassPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/teacher/create-class"
              element={
                <PrivateRoute>
                  <CreateClassPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;