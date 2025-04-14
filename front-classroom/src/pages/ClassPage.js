import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaTasks, FaFolderOpen, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useClassData } from '../hooks/useClassData';
import { AnnouncementForm } from '../components/Forms/AnnouncementForm';
import { AnnouncementsList } from '../components/Lists/AnnouncementsList';
import { TaskForm } from '../components/Forms/TaskForm';
import { TaskList } from '../components/Lists/TaskList';
import { MaterialForm } from '../components/Forms/MaterialForm';
import { MaterialList } from '../components/Lists/MaterialList';
import { StudentList } from '../components/Lists/StudentList';
import './ClassPage.css';

function ClassPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('avisos');
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.tipoUsuario === 'profesor' ? 'teacher' : 'student');
    }
  }, []);

  const {
    loading,
    error,
    className,
    announcements,
    setAnnouncements,
    tasks,
    materials,
    students
  } = useClassData(id);

  if (loading) {
    return <div className="loading">Cargando clase...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleAnnouncementCreated = (newAnnouncement) => {
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const isTeacher = userRole === 'teacher';

  return (
    <div className="class-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>

      <header className="class-header">
        <h2>{className}</h2>
      </header>

      <nav className="class-tabs">
        <button 
          onClick={() => setActiveTab('avisos')} 
          className={`tab-button ${activeTab === 'avisos' ? 'active' : ''}`}
        >
          <FaBullhorn /> Avisos
        </button>
        <button 
          onClick={() => setActiveTab('tareas')} 
          className={`tab-button ${activeTab === 'tareas' ? 'active' : ''}`}
        >
          <FaTasks /> Tareas
        </button>
        {isTeacher && (
          <button 
            onClick={() => setActiveTab('materiales')} 
            className={`tab-button ${activeTab === 'materiales' ? 'active' : ''}`}
          >
            <FaFolderOpen /> Materiales
          </button>
        )}
        <button 
          onClick={() => setActiveTab('alumnos')} 
          className={`tab-button ${activeTab === 'alumnos' ? 'active' : ''}`}
        >
          <FaUsers /> {isTeacher ? 'Alumnos' : 'Personas'}
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'avisos' && (
          <div className="tab-pane announcements-tab">
            {isTeacher && (
              <div className="form-section">
                <AnnouncementForm 
                  classId={id} 
                  onAnnouncementCreated={handleAnnouncementCreated} 
                />
              </div>
            )}
            <div className="content-section">
              <AnnouncementsList announcements={announcements} />
            </div>
          </div>
        )}

        {activeTab === 'tareas' && (
          <div className="tab-pane tasks-tab">
            {isTeacher && (
              <div className="form-section">
                <TaskForm classId={id} />
              </div>
            )}
            <div className="content-section">
              <TaskList tasks={tasks} />
            </div>
          </div>
        )}

        {isTeacher && activeTab === 'materiales' && (
          <div className="tab-pane materials-tab">
            <div className="form-section">
              <MaterialForm classId={id} />
            </div>
            <div className="content-section">
              <MaterialList materials={materials} />
            </div>
          </div>
        )}

        {activeTab === 'alumnos' && (
          <div className="tab-pane people-tab">
            <StudentList students={students} />
          </div>
        )}
      </main>
    </div>
  );
}

export default ClassPage;