import React, { useState, useEffect } from 'react';
import { MaterialForm } from '../Forms/MaterialForm';
import { MaterialList } from '../Lists/MaterialList';
const api_route = require("../../config.json").api_route;

export const MaterialsSection = ({ classId, isTeacher }) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, [classId]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${api_route}/materiales/get-materiales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ claseId: classId })
      });

      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Error al cargar los materiales:', error);
    }
  };

  const handleMaterialCreated = (newMaterial) => {
    setMaterials(prevMaterials => [newMaterial, ...prevMaterials]);
  };

  return (
    <div className="tab-pane materials-tab">
      {isTeacher && (
        <MaterialForm
          classId={classId}
          onMaterialCreated={handleMaterialCreated}
        />
      )}
      <MaterialList materials={materials} />
    </div>
  );
};