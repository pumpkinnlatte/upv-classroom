import React from "react";

export const AlumnoFormLeft = ({ formData, handleInputChange, handleSubmit, students }) => {

    console.log("Estudiantes desde el form", students);

    return(
        <div className="tema-wrapper">
            <div className="left-form">
                <label>Selecciona un alumno</label>
                
                <select  name="usuarioId" value={formData.usuarioId} onChange={handleInputChange}> 
                    <option value="">Selecciona un alumno</option>
                    {students.map(student => (
                        <option key={student.matricula} value={student.usuario_id}>
                            {student.nombre}
                        </option>
                    ))}
                </select>

                <button className="btn-1" onClick={handleSubmit}>Agregar a la clase</button>
            </div>
        </div>  
    );
};
