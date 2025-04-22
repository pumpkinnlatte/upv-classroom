import React from "react";
import { MaterialFormLeft, MaterialFormRight } from "../../forms/MaterialForm";
import { useMaterialForm } from "../../hooks/useMaterialForm";
import { useClass } from "../../context/ClassContext";
import "../../css/nuevoContentPage.css"

function NuevoMaterialPage (){
    const { currentClass } = useClass();
    const { 
        formData, 
        handleInputChange, 
        handleSubmit, 
        topics, 
        handleFileChange, 
        selectedFiles 
    } = useMaterialForm(currentClass.clase_id);

    return (
        <div className="content">
            <div className="center-content-form">
                <MaterialFormLeft 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    selectedFiles={selectedFiles}
                />
            </div>

            <div className="center-content-right">
                <MaterialFormRight 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    topics={topics}
                />
            </div>
        </div>
    );
}

export default NuevoMaterialPage;