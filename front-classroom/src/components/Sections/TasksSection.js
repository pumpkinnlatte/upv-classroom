import React from 'react';
import { getTasks } from '../../services/apiGet';
import { sendTaskData } from '../../services/apiSend';

export const TasksSection = ({ classId, isTeacher }) => {
  return (
    <BaseSection
      type="task"
      classId={classId}
      isTeacher={isTeacher}
      fetchItems={getTasks}
      sendDataFunction={sendTaskData}
      showDueDate={true}
      acceptedFiles="image/*,application/pdf,.doc,.docx"
      listConfig={{
        titleField: 'titulo_tarea',
        descriptionField: 'descripcion_tarea',
        idField: 'tarea_id'
      }}
    />
  );
};