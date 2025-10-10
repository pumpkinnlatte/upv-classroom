import React from "react";

export const ClaseFormLeft = ({ formData, handleInputChange, handleSubmit }) => {
    return(
        <div className="tema-wrapper">
            <div className="left-form">
                <label>Nombre *</label>
                <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Escribe un título" 
                />
                
                <label>Descripcion</label>
                <textarea 
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Agrega una descripcion (opcional)"
                ></textarea>

                <label>Carrera *</label>
                <select 
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleInputChange}
                >
                    <option value="Tecnologias de la Informacion">Tecnologias de la Informacion</option>
                    <option value="Mecatronica">Mecatronica</option>
                    <option value="Manufactura Avanzada">Manufactura Avanzada</option>
                    <option value="Sistemas Automotrices">Sistemas Automotrices</option>
                    <option value="Comercio Internacional y Aduanas">Tecnologias de la Informacion</option>
                    <option value="Administracion">Administracion</option>
                </select>

                <label>Cuatrimestre *</label>
                <select 
                    name="cuatrimestre"
                    value={formData.cuatrimestre}
                    onChange={handleInputChange}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>

                <button className="btn-1" onClick={handleSubmit}>Crear Clase</button>
            </div>
        </div>  
    );
};
