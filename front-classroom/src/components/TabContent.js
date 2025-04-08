// src/components/TabContent.js
import React from 'react';
import AnnouncementSection from './AnnouncementSection'; // Componente para la sección de avisos
import TaskSection from './TaskSection'; // Componente para la sección de tareas
import MaterialSection from './MaterialSection'; // Componente para la sección de materiales
import StudentSection from './StudentSection'; // Componente para la sección de alumnos

function TabContent({ activeTab, announcements, tasks, materials, enrolledStudents }) {
  return (
    <main className="tab-content">
      {activeTab === 'avisos' && (
        <AnnouncementSection announcements={announcements} />
      )}
      {activeTab === 'tareas' && (
        <TaskSection tasks={tasks} />
      )}
      {activeTab === 'materiales' && (
        <MaterialSection materials={materials} />
      )}
      {activeTab === 'alumnos' && (
        <StudentSection enrolledStudents={enrolledStudents} />
      )}
    </main>
  );
}

export default TabContent;