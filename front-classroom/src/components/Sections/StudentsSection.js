import React, { useState, useEffect } from 'react';
import { StudentList } from '../Lists/StudentList';
const api_route = require("../../config.json").api_route;

export const StudentsSection = ({ classId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
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
      <StudentList students={students} />
    </div>
  );
};