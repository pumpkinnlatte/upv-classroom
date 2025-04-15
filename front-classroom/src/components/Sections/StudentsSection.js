import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { StudentList } from '../Lists/StudentList';
import { AddStudentForm } from '../Forms/AddStudentForm';
import { SearchStudentsForm } from '../Forms/SearchStudentsForm';
import './StudentsSection.css';

const api_route = require("../../config.json").api_route;

export const StudentsSection = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [addMethod, setAddMethod] = useState('search'); // 'search' or 'email'

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setIsTeacher(decoded.tipoUsuario === 'profesor');
    }
    fetchStudents();
  }, [classId]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${api_route}/clases/get-alumnos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ claseId: classId })
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error al cargar los alumnos:', error);
    }
  };

  return (
    <div className="tab-pane students-tab">
      {isTeacher && (
        <div className="add-student-section">
          <div className="add-method-selector">
            <button 
              className={`method-button ${addMethod === 'search' ? 'active' : ''}`}
              onClick={() => setAddMethod('search')}
            >
              Buscar alumno
            </button>
            <button 
              className={`method-button ${addMethod === 'email' ? 'active' : ''}`}
              onClick={() => setAddMethod('email')}
            >
              Añadir por correo
            </button>
          </div>
          
          {addMethod === 'search' ? (
            <SearchStudentsForm classId={classId} onStudentAdded={fetchStudents} />
          ) : (
            <AddStudentForm classId={classId} onStudentAdded={fetchStudents} />
          )}
        </div>
      )}
      <StudentList students={students} />
    </div>
  );
};