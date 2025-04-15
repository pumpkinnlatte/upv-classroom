import React from 'react';
import { useTopicForm } from '../../hooks/useTopicForm';
import './Forms.css';

export function TopicForm({ classId, onSuccess }) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    handleSubmit
  } = useTopicForm(classId, onSuccess);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Título del tema</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows="4"
        />
      </div>
      <button type="submit" className="submit-button">
        Crear Tema
      </button>
    </form>
  );
}