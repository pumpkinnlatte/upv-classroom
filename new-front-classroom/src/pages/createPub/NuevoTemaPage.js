import React from "react";
import { TemaFormLeft } from "../../forms/TemaForm";
import { useTemaForm } from "../../hooks/useTemaForm";
import { useClass } from "../../context/ClassContext";
import "../../css/nuevoContentPage.css"

function NuevoTemaPage (){
    const { currentClass } = useClass();
    const { formData, handleInputChange, handleSubmit } = useTemaForm(currentClass.clase_id);

    return (
        <div className="content">
            <div className="center-content-form">
                <TemaFormLeft 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default NuevoTemaPage;