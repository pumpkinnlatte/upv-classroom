import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import CreateClassPage from './pages/CreateClassPage';
import TaskDetailPage from './pages/TaskDetailPage';
import CreateTaskPage from './pages/CreateTaskPage';
import CreateMaterialPage from './pages/CreateMaterialPage';
import CreateTopicPage from './pages/CreateTopicPage';
import AnnouncementDetailPage from './pages/AnnouncementDetailPage';
import MaterialDetailPage from './pages/MaterialDetailPage';
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
    <Router>
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
            <Route
              path="/c/:classId/t/:taskId"
              element={
                <PrivateRoute>
                  <TaskDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/clase/:id/crear-tarea"
              element={
                <PrivateRoute>
                  <CreateTaskPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/clase/:id/crear-material"
              element={
                <PrivateRoute>
                  <CreateMaterialPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/clase/:id/crear-tema"
              element={
                <PrivateRoute>
                  <CreateTopicPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/c/:classId/aviso/:announcementId"
              element={
                <PrivateRoute>
                  <AnnouncementDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/c/:classId/material/:materialId"
              element={
                <PrivateRoute>
                  <MaterialDetailPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;