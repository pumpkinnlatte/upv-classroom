import React, { useState, useEffect } from 'react';
import { TaskForm } from '../Forms/TaskForm';
import { TaskList } from '../Lists/TaskList';
const api_route = require("../../config.json").api_route;

export const TasksSection = ({ classId, isTeacher }) => {
  const [tasks, setTasks] = useState([]);

  /*useEffect(() => {
    fetchTasks();
  }, [classId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${api_route}/tareas/get-tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ claseId: classId })
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error al cargar las tareas:', error);
    }
  };*/

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  return (
    <div className="tab-pane tasks-tab">
      {isTeacher && (
        <TaskForm
          classId={classId}
          onTaskCreated={handleTaskCreated}
        />
      )}
      <TaskList tasks={tasks} />
    </div>
  );
};