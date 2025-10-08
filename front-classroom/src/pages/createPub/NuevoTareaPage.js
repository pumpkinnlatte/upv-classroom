import React from "react";
import { TareaFormLeft, TareaFormRight } from "../../forms/TareaForm";
import { useTareaForm } from "../../hooks/useTareaForm";
import {useClass} from "../../context/ClassContext";
import "../../css/nuevoContentPage.css"

function NuevoTareaPage (){
    const { currentClass } = useClass();
    const { 
        formData, 
        handleInputChange, 
        handleSubmit, 
        topics, 
        handleFileChange, 
        selectedFiles 
    } = useTareaForm(currentClass.clase_id);

    return (
        <div className="content">
            <div className="center-content-form">
                <TareaFormLeft 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    selectedFiles={selectedFiles}
                />
            </div>

            <div className="center-content-right">
                <TareaFormRight 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    topics={topics}
                />
            </div>
        </div>
    );
}

export default NuevoTareaPage;