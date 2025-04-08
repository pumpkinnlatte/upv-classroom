import React from 'react';
import { FaUserGraduate, FaIdCard } from 'react-icons/fa';

export const StudentList = ({ students }) => {
  return (
    <section className="students-display-section">
      <h3>Alumnos Inscritos</h3>
      {students.length > 0 ? (
        <ul className="students-list">
          {students.map(student => (
            <li key={student.usuario_id} className="student-item">
              <div className="student-info">
                <span className="student-name">
                  <FaUserGraduate /> {student.nombre}
                </span>
                <span className="student-id">
                  <FaIdCard /> {student.matricula}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-students">No hay alumnos inscritos en esta clase.</p>
      )}
    </section>
  );
};