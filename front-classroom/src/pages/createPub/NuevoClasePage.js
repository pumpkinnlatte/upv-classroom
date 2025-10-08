import React from "react";
import { ClaseFormLeft } from "../../forms/ClaseForm";
import { useClaseForm } from "../../hooks/useClaseForm";
import "../../css/nuevoContentPage.css"

function NuevoClasePage (){
    const { formData, handleInputChange, handleSubmit } = useClaseForm();

    return (
        <div className="content">
            <div className="center-content-form">
                <ClaseFormLeft 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default NuevoClasePage;