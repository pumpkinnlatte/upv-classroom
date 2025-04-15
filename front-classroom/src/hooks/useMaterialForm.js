import { useState } from 'react';
import { sendMaterialData, sendFileData } from '../services/apiSend';

export const useMaterialForm = (classId, onMaterialCreated) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    const fileInput = document.getElementById('materialAttachmentFile');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Por favor, completa el título y la descripción del material.");
      return;
    }

    try {
      // Se serializan los datos del material
      const materialData = {
        tituloMaterial: title.trim(),
        descripcionMaterial: description.trim(),
        fechaPublicacion: new Date().toISOString(),
        claseId: classId,
        temaId: selectedTopic || null,
        hasFile: file ? 1 : 0
      };

      // Se envian los datos a la API  
      const newMaterialData = await sendMaterialData(materialData);

      if (!newMaterialData) {
        throw new Error('Error al crear el material');
      }

      alert("Material creado correctamente.");

      //Si existe un archivo
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('publicacionId', newMaterialData.materialId);
        formData.append('tipoPublicacion', 'material');

        const fileResponse = await sendFileData(formData);
        if (!fileResponse) {
          throw new Error('Error al subir el archivo');
        }
      }

      onMaterialCreated && onMaterialCreated({
        material_id: newMaterialData.materialId,
        titulo_material: title,
        descripcion_material: description,
        fecha_publicacion: new Date().toISOString()
      });

      setTitle('');
      setDescription('');
      handleRemoveFile();

    } catch (error) {
      console.error("Error al crear el material:", error);
      alert(error.message || "Error al crear el material");
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    file,
    fileName,
    selectedTopic,
    setSelectedTopic,
    handleFileChange,
    handleRemoveFile,
    handleSubmit
  };
};