import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBullhorn, FaTasks, FaFolderOpen, FaUsers, FaArrowLeft, FaNewspaper, FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { useClassData } from '../hooks/useClassData';
import { AnnouncementForm } from '../components/Forms/AnnouncementForm';
import { AnnouncementsList } from '../components/Lists/AnnouncementsList';
import { TaskForm } from '../components/Forms/TaskForm';
import { TaskList } from '../components/Lists/TaskList';
import { MaterialForm } from '../components/Forms/MaterialForm';
import { MaterialList } from '../components/Lists/MaterialList';
import { StudentList } from '../components/Lists/StudentList';
import { TopicSection } from '../components/Sections/TopicSection';
import { formatDate } from '../services/utils';
import { getTopics } from '../services/apiGet';
import './ClassPage.css';

function ClassPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('novedades');
  const [userRole, setUserRole] = useState('student');;
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.tipoUsuario === 'profesor' ? 'teacher' : 'student');
    }
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await getTopics(id);
        setTopics(topicsData);
      } catch (error) {
        console.error('Error al cargar los temas:', error);
      }
    };
    fetchTopics();
  }, [id]);

  const {
    loading,
    error,
    className,
    teacherName,
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

  const handleCreateClick = (type) => {
    switch (type) {
      case 'task':
        navigate(`/clase/${id}/crear-tarea`);
        break;
      case 'material':
        navigate(`/clase/${id}/crear-material`);
        break;
      case 'topic':
        navigate(`/clase/${id}/crear-tema`);
        break;
      default:
        console.warn(`Tipo de creación no reconocido: ${type}`);
    }
  };

  const handleNewsClick = (publication) => {
    if (publication.type === 'aviso') {
      navigate(`/c/${id}/aviso/${publication.id}`);
      return;
    }
    if (publication.type === 'material') {
      navigate(`/c/${id}/material/${publication.id}`);
      return;
    }
    setActiveTab('trabajo');
    setTimeout(() => {
      let elementId;
      if (publication.type === 'tarea') {
        elementId = `tarea-${publication.id}`;
      }
      
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.classList.add('highlighted');
        setTimeout(() => element.classList.remove('highlighted'), 2000);
      }
    }, 100);
  };

  const isTeacher = userRole === 'teacher';

  const organizeContentByTopic = () => {
    const organizedContent = new Map();
    
    // Initialize with existing topics
    topics.forEach(topic => {
      organizedContent.set(topic.tema_id, {
        topic,
        tasks: [],
        materials: []
      });
    });
    
    // Add "Sin tema" category
    organizedContent.set(null, {
      topic: null,
      tasks: [],
      materials: []
    });

    // Organize tasks by topic
    tasks.forEach(task => {
      const topicId = task.tema_id || null;
      if (organizedContent.has(topicId)) {
        organizedContent.get(topicId).tasks.push(task);
      } else {
        organizedContent.get(null).tasks.push(task);
      }
    });

    // Organize materials by topic
    materials.forEach(material => {
      const topicId = material.tema_id || null;
      if (organizedContent.has(topicId)) {
        organizedContent.get(topicId).materials.push(material);
      } else {
        organizedContent.get(null).materials.push(material);
      }
    });

    return Array.from(organizedContent.values());
  };

  // Función para combinar y ordenar todas las publicaciones
  const getAllPublications = () => {
    const allPublications = [
      ...announcements.map(a => ({ 
        ...a, 
        type: 'aviso', 
        id: a.aviso_id,
        icon: <FaBullhorn /> 
      })),
      ...tasks.map(t => ({ 
        ...t, 
        type: 'tarea', 
        id: t.tarea_id,
        icon: <FaTasks /> 
      })),
      ...materials.map(m => ({ 
        ...m, 
        type: 'material', 
        id: m.material_id,
        icon: <FaFolderOpen /> 
      }))
    ];
    return allPublications.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  };

  return (
    <div className="class-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Regresar
      </button>

      <header className="class-header">
        <h2>{className}</h2>
        <p className="teacher-name">Profesor: {teacherName}</p>
      </header>

      <nav className="class-tabs">
        <button 
          onClick={() => setActiveTab('novedades')} 
          className={`tab-button ${activeTab === 'novedades' ? 'active' : ''}`}
        >
          <FaNewspaper /> Novedades
        </button>
        <button 
          onClick={() => setActiveTab('trabajo')} 
          className={`tab-button ${activeTab === 'trabajo' ? 'active' : ''}`}
        >
          <FaChalkboardTeacher /> Trabajo en clase
        </button>
        <button 
          onClick={() => setActiveTab('alumnos')} 
          className={`tab-button ${activeTab === 'alumnos' ? 'active' : ''}`}
        >
          <FaUsers /> {isTeacher ? 'Alumnos' : 'Personas'}
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'novedades' && (
          <div className="tab-pane news-tab">
            {isTeacher && (
              <div className="form-section">
                <AnnouncementForm 
                  classId={id} 
                  onAnnouncementCreated={handleAnnouncementCreated} 
                />
              </div>
            )}
            <div className="content-section">
              {getAllPublications().map((publication, index) => (
                <div 
                  key={index} 
                  className="publication-item" 
                  onClick={() => handleNewsClick(publication)}
                >
                  <div className="publication-header">
                    {publication.icon}
                    <span>{teacherName}</span>
                  </div>
                  <h3>
                    {publication.type === 'aviso' ? publication.titulo_aviso :
                     publication.type === 'tarea' ? publication.titulo_tarea :
                     publication.titulo_material}
                  </h3>
                  <p>
                    {publication.type === 'aviso' ? publication.descripcion_aviso :
                     publication.type === 'tarea' ? publication.descripcion_tarea :
                     publication.descripcion_material}
                  </p>
                  <span className="publication-date">{formatDate(publication.fecha_publicacion)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trabajo' && (
          <div className="tab-pane work-tab">
            <div className="content-section">
              {isTeacher && (
                <div className="create-options">
                  <button className="create-button" onClick={() => handleCreateClick('task')}>
                    <FaTasks />
                    <span>Nueva Tarea</span>
                  </button>
                  <button className="create-button" onClick={() => handleCreateClick('material')}>
                    <FaFolderOpen />
                    <span>Nuevo Material</span>
                  </button>
                  <button className="create-button" onClick={() => handleCreateClick('topic')}>
                    <FaPlus />
                    <span>Nuevo Tema</span>
                  </button>
                </div>
              )}
            </div>
            <div className="work-content">
                {organizeContentByTopic().map((content, index) => (
                  <TopicSection
                    key={content.topic?.temaId || `no-topic-${index}`}
                    topic={content.topic}
                    tasks={content.tasks}
                    materials={content.materials}
                  />
                ))}
              </div>
          </div>
        )}

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
              <TaskList tasks={tasks} classId={id} />
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