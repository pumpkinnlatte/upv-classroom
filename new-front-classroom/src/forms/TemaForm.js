import React from "react";

export const TemaFormLeft = ({ formData, handleInputChange, handleSubmit }) => {
    return(
        <div className="tema-wrapper">
            <div className="left-form">
                <label>Título</label>
                <input 
                    type="text" 
                    name="nombreTema"
                    value={formData.nombreTema}
                    onChange={handleInputChange}
                    placeholder="Escribe un título" 
                />
                
                <label>Descripcion</label>
                <textarea 
                    name="descripcionTema"
                    value={formData.descripcionTema}
                    onChange={handleInputChange}
                    placeholder="Agrega una descripcion (opcional)"
                ></textarea>

                <button className="btn-1" onClick={handleSubmit}>Agregar Nuevo Tema</button>
            </div>
        </div>  
    );
};
