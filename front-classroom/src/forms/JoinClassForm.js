import React from "react";
import { useJoinClassForm } from "../hooks/useJoinClassForm";

export const JoinClassForm = () => {
    const { formData, handleInputChange, handleSubmit } = useJoinClassForm();

    return(
        <div className="join-class-wrapper">
            <input 
                type="text" 
                name="codigoClase"
                value={formData.codigoClase}
                onChange={handleInputChange}
                placeholder="Ingresa el código de la clase" 
            />
            <button className="btn-1" onClick={handleSubmit}>Unirse</button>
        </div>  
    );
};