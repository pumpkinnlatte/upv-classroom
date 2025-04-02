import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importa tus otros componentes de página
import LoginPage from './pages/LoginPage';
import StudentHome from './pages/StudentHome';
import StudentClass from './pages/StudentClass';
import TeacherHome from './pages/TeacherHome';
import TeacherClass from './pages/TeacherClass';
import CreateClassPage from './pages/CreateClassPage'; // <-- Importante importar

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} /> z

        {/* Rutas de Alumno */}
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/class/:id" element={<StudentClass />} />
  
         {/* Rutas de Profesor */}
        <Route path="/teacher/home" element={<TeacherHome />} />
        <Route path="/teacher/class/:id" element={<TeacherClass />} />
        <Route path="/teacher/create-class" element={<CreateClassPage />} />
        {/* ------------------------------------- */}
      </Routes>
    </Router>
  );
}

export default App;