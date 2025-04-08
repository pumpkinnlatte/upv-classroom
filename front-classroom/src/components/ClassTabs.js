// src/components/ClassTabs.js
import React from 'react';
import {
  FaBullhorn, FaTasks, FaFolderOpen, FaUsers
} from 'react-icons/fa';

function ClassTabs({ activeTab, setActiveTab }) {
  return (
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
  );
}

export default ClassTabs;