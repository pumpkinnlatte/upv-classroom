import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaTasks, FaFolderOpen, FaUsers, FaArrowLeft } from 'react-icons/fa';
import { useClassData } from '../hooks/useClassData';
import { AnnouncementForm } from '../components/Forms/AnnouncementForm';
import { AnnouncementsList } from '../components/Lists/AnnouncementsList';
import { TaskForm } from '../components/Forms/TaskForm';
import { TaskList } from '../components/Lists/TaskList';
import { MaterialForm } from '../components/Forms/MaterialForm';
import { MaterialList } from '../components/Lists/MaterialList';
import { StudentList } from '../components/Lists/StudentList';
import './TeacherClass.css';

function TeacherClass() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('avisos');

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

  return (
    <div className="teacher-class-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>

      <header className="class-header">
        <h2>{className} <span className="class-id-display">(ID: {id})</span></h2>
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
        <button 
          onClick={() => setActiveTab('materiales')} 
          className={`tab-button ${activeTab === 'materiales' ? 'active' : ''}`}
        >
          <FaFolderOpen /> Materiales
        </button>
        <button 
          onClick={() => setActiveTab('alumnos')} 
          className={`tab-button ${activeTab === 'alumnos' ? 'active' : ''}`}
        >
          <FaUsers /> Alumnos
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'avisos' && (
          <div className="tab-pane announcements-tab">
            <AnnouncementForm 
              classId={id} 
              onAnnouncementCreated={handleAnnouncementCreated} 
            />
            <AnnouncementsList announcements={announcements} />
          </div>
        )}

        {activeTab === 'tareas' && (
          <div className="tab-pane tasks-tab">
            <TaskForm classId={id} />
            <TaskList tasks={tasks} />
          </div>
        )}

        {activeTab === 'materiales' && (
          <div className="tab-pane materials-tab">
            <MaterialForm classId={id} />
            <MaterialList materials={materials} />
          </div>
        )}

        {activeTab === 'alumnos' && (
          <div className="tab-pane students-tab">
            <StudentList classId={id} students={students} />
          </div>
        )}
      </main>
    </div>
  );
}

export default TeacherClass;