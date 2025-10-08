import React from "react";

export const MaterialFormLeft = ({ formData, handleInputChange, handleFileChange, selectedFiles }) => {
    return(
        <>
            <div className="left-form">
                <label>Título</label>
                <input 
                    type="text" 
                    name="tituloMaterial"
                    value={formData.tituloMaterial}
                    onChange={handleInputChange}
                    placeholder="Escribe un título" 
                />
                
                <label>Descripcion</label>
                <textarea 
                    name="descripcionMaterial"
                    value={formData.descripcionMaterial}
                    onChange={handleInputChange}
                    placeholder="Agrega una descripcion para el (opcional)"
                ></textarea>
            </div>
            <div className="left-form">  
                <label>Adjunta un archivo</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <button className="btn-2" onClick={() => document.getElementById('fileInput').click()}>
                    <img src="/svg/icons8-plus.svg" alt="plus icon" width={18}/>
                    Añadir un archivo
                </button>
                {selectedFiles && Array.from(selectedFiles).map((file, index) => (
                    <div key={index}>{file.name}</div>
                ))}
            </div>
        </>
    );
};

export const MaterialFormRight = ({ formData, handleInputChange, handleSubmit, topics }) => {
    return(
        <div className="right-form">
            <label>Tema</label>
            <select 
                name="temaId"
                value={formData.temaId}
                onChange={handleInputChange}
            >
                <option value="">Sin tema</option>
                {topics && topics.map((topic) => (
                    <option key={topic.tema_id} value={topic.tema_id}>
                        {topic.nombre_tema}
                    </option>
                ))}
            </select>

            <button className="btn-1" onClick={handleSubmit}>Publicar</button>
        </div>
    );
};
