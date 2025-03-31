// src/pages/StudentHome.js
import React from 'react'; // Añade import si no estaba
import { Link } from "react-router-dom";
import './StudentHome.css';
import { FaRegFolder, FaUserGraduate } from 'react-icons/fa';

const predefinedColors = ['#1a73e8', '#e84118', '#44bd32', '#fbc531', '#9c88ff', '#00a8ff', '#e84393'];
function getCardColor(classId) { const index = classId % predefinedColors.length; return predefinedColors[index]; }

function StudentHome() {
  const enrolledClasses = [ /* ... datos de ejemplo ... */ ].map(course => ({ ...course, color: getCardColor(course.id) }));

  // --- Estados y manejador para UNIRSE A CLASE (Se mantienen) ---
  const [joinCode, setJoinCode] = React.useState(""); // Usa React.useState si no importaste useState individualmente
  const [joinMessage, setJoinMessage] = React.useState({ type: '', text: '' });
  const [isJoining, setIsJoining] = React.useState(false);

  const handleJoinClass = async (event) => { /* ... lógica simulación ... */ };
  // --- Fin sección Unirse a Clase ---

  return (
    <div className="student-home-page">
       <div className="page-header">
        <h2 className="page-title">Mis Clases</h2>
        <form onSubmit={handleJoinClass} className="join-class-form">
          <input type="text" className="form-input join-code-input" placeholder="Código de la clase" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} disabled={isJoining} />
          <button type="submit" className="button join-button" disabled={isJoining}>{isJoining ? 'Uniéndote...' : 'Unirse'}</button>
        </form>
       </div>
       {joinMessage.text && (<div className={`join-message ${joinMessage.type}`}>{joinMessage.text}</div>)}

      {enrolledClasses.length > 0 ? (
        <div className="class-grid">
          {enrolledClasses.map(course => (
            <Link key={course.id} to={`/student/class/${course.id}`} className="class-card-link">
              <div className="class-card">
                <div className="card-header" style={{ backgroundColor: course.color }}>
                   <h3 className="card-title"><span className="card-title-link">{course.name}</span></h3>
                   <p className="card-teacher">{course.teacher}</p>
                   <div className="card-avatar" style={{ backgroundColor: course.color }}><span>{course.teacher ? course.teacher.charAt(0).toUpperCase() : 'P'}</span></div>
                </div>
                <div className="card-content"></div>
                <div className="card-actions">
                   <button onClick={(e) => { e.preventDefault(); alert('Abrir carpeta (pendiente)'); }} title="Abrir carpeta de la clase en Google Drive"><FaRegFolder /></button>
                   <button onClick={(e) => { e.preventDefault(); alert('Ver tus trabajos (pendiente)'); }} title="Tareas pendientes"><FaUserGraduate /></button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : ( <p className="no-classes">Aún no estás inscrito en ninguna clase.</p> )}
    </div>
  );
}
// Lógica de simulación para handleJoinClass (fuera o dentro si prefieres)
const handleJoinClass = async (event, joinCode, setJoinMessage, setIsJoining, setJoinCode) => { /* ... */ };

export default StudentHome;