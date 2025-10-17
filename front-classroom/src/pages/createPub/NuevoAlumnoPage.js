import React from "react";
import { AlumnoFormLeft } from "../../forms/AlumnoForm";
import { useAlumnoForm } from "../../hooks/useAlumnoForm";
import { useClass } from "../../context/ClassContext";
import "../../css/nuevoContentPage.css"

function NuevoAlumnoPage (){
    const { currentClass } = useClass();

    const { formData, 
            handleInputChange, 
            handleSubmit,
            students
         } = useAlumnoForm(currentClass.clase_id);

    return (
        <div className="content">
            <div className="center-content-form">
                <AlumnoFormLeft 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    students={students}
                />
            </div>
        </div>
    );
}

export default NuevoAlumnoPage;