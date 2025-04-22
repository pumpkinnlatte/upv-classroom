import React from "react";
import { useAvisoForm } from "../hooks/useAvisoForm";

function AvisoForm({ onSuccess }) {
    const { formData, selectedFiles, handleInputChange, handleFileChange, handleSubmit } = useAvisoForm(onSuccess);
    
    return (
        <form onSubmit={handleSubmit} className="aviso-form">
            <label>Título</label>
            <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Escribe un título"
            />
            
            <label>Contenido</label>
            <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Anuncia algo a tu clase"
            ></textarea>

            <label>Adjunta un archivo</label>
            <label htmlFor="file-input" className="btn-2">
                <img src="/svg/icons8-plus.svg" alt="plus icon" width={18}/>
                Añadir un archivo
            </label>
            <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
            />

            {selectedFiles.length > 0 && (
                <div className="selected-files">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="file-item">
                            {file.name}
                        </div>
                    ))}
                </div>
            )}

            <button type="submit" className="btn-1">Publicar</button>
        </form>
    );
}

export default AvisoForm;