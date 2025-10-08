import React from "react";

export const TareaFormLeft = ({ formData, handleInputChange, handleFileChange, selectedFiles }) => {
    return(
        <>
            <div className="left-form">
                <label>Título</label>
                <input 
                    type="text" 
                    name="tituloTarea"
                    value={formData.tituloTarea}
                    onChange={handleInputChange}
                    placeholder="Escribe un título" 
                />
                
                <label>Instrucciones</label>
                <textarea 
                    name="descripcionTarea"
                    value={formData.descripcionTarea}
                    onChange={handleInputChange}
                    placeholder="Agrega instrucciones para la tarea (opcional)"
                ></textarea>
            </div>
            <div className="left-form">  
                <label>Adjunta un archivo</label>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <button 
                    className="btn-2"
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <img src="/svg/icons8-plus.svg" alt="plus icon" width={18}/>
                    Añadir un archivo
                </button>
                {selectedFiles && selectedFiles.length > 0 && (
                    <div className="selected-files">
                        {Array.from(selectedFiles).map((file, index) => (
                            <div key={index} className="file-item">
                                {file.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export const TareaFormRight = ({ formData, handleInputChange, handleSubmit, topics }) => {
    return(
        <div className="right-form">
            <label>Puntos</label>
            <input 
                type="number" 
                name="puntosMax"
                value={formData.puntosMax}
                onChange={handleInputChange}
                placeholder="Sin calificar" 
                min={0}
            />
            
            <label>Fecha limite</label>
            <input 
                type="datetime-local" 
                name="fechaLimite"
                value={formData.fechaLimite}
                onChange={handleInputChange}
                placeholder="Sin fecha limite" 
            />

            <label>Tema</label>
            <select 
                name="temaId"
                value={formData.temaId}
                onChange={handleInputChange}
            >
                <option value="">Sin tema</option>
                {topics && topics.map(topic => (
                    <option key={topic.tema_id} value={topic.tema_id}>
                        {topic.nombre_tema}
                    </option>
                ))}
            </select>

            <button className="btn-1" onClick={handleSubmit}>Publicar</button>
        </div>
    );
};
