import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClaseNovedades from './pages/claseVistas/ClaseNovedades';
import ClaseTrabajo from './pages/claseVistas/ClaseTrabajo';
import ClasePersonas from './pages/claseVistas/ClasePersonas';
import NuevoTareaPage from './pages/createPub/NuevoTareaPage';
import NuevoMaterialPage from './pages/createPub/NuevoMaterialPage';
import NuevoTemaPage from './pages/createPub/NuevoTemaPage';
import MaterialDetail from './pages/detailPub/MaterialDetail';
import TareaDetail from './pages/detailPub/TareaDetail';
import { useAuth } from './context/AuthContext';
import AvisoDetail from './pages/detailPub/AvisoDetail';
import NuevoClasePage from './pages/createPub/NuevoClasePage';
import NuevoAlumnoPage from './pages/createPub/NuevoAlumnoPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function TeacherRoute({ children }) {
  const { isTeacher, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return isTeacher ? children : <Navigate to="/" />;
}

function AppContent() {
  const location = useLocation();
  const mostrarSectionBar = location.pathname.includes('/c/');
  const mostrarNavbar = !location.pathname.includes('/login');
  const mostrarLogOut = location.pathname === '/';
  const tipoNavBar = location.pathname.includes('/t/');
  const { isTeacher, isLoading } = useAuth();

  console.log("isTeacher", isTeacher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {mostrarNavbar && <Navbar mostrarSectionBar={mostrarSectionBar} tipoNavBar={tipoNavBar} mostrarLogOut={mostrarLogOut}/>}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/c/:id/novedades" element={
          <ProtectedRoute>
            <ClaseNovedades isTeacher={isTeacher} />
          </ProtectedRoute>
        } />
        <Route path="/c/:id/trabajo" element={
          <ProtectedRoute>
            <ClaseTrabajo isTeacher={isTeacher} />
          </ProtectedRoute>
        } />
        <Route path="/c/:id/personas" element={
          <ProtectedRoute>
            <ClasePersonas isTeacher={isTeacher} />
          </ProtectedRoute>
        } />
        <Route path="/c/:id/nuevo-alumno" element={
          <TeacherRoute>
            <NuevoAlumnoPage/>
          </TeacherRoute>
        } />
        <Route path="/a/nuevo-clase" element={
          <TeacherRoute>
            <NuevoClasePage />
          </TeacherRoute>
        } />
        <Route path="/t/:id/nueva-tarea" element={
          <TeacherRoute>
            <NuevoTareaPage />
          </TeacherRoute>
        } />
        <Route path="/t/:id/nuevo-material" element={
          <TeacherRoute>
            <NuevoMaterialPage />
          </TeacherRoute>
        } />
        <Route path="/t/:id/nuevo-tema" element={
          <TeacherRoute>
            <NuevoTemaPage />
          </TeacherRoute>
        } />

        <Route path="/t/:id/aviso/:workId" element={<AvisoDetail />} />
        <Route path="/t/:id/material/:workId" element={<MaterialDetail />} />
        <Route path="/t/:id/tarea/:workId" element={<TareaDetail isTeacher={isTeacher} />} />
      </Routes>
    </div>
  );
}

export default AppContent;