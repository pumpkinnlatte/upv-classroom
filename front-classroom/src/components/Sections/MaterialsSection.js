import React from 'react';
import { BaseSection } from '../Common/BaseSection';
import { getMaterials } from '../../services/apiGet';
import { sendMaterialData } from '../../services/apiSend';

export const MaterialsSection = ({ classId, isTeacher }) => {
  return (
    <BaseSection
      type="material"
      classId={classId}
      isTeacher={isTeacher}
      fetchItems={getMaterials}
      sendDataFunction={sendMaterialData}
      listConfig={{
        titleField: 'titulo_material',
        descriptionField: 'descripcion_material',
        idField: 'material_id'
      }}
    />
  );
};