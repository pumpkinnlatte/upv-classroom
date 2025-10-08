import React, { useState } from "react";
import { actualizarCalificacion } from "../services/apiSend";

function EntregaItem({ entrega, onClick, maxGrade }) {
    const [grade, setGrade] = useState(entrega.calificacion || '');

    const handleGradeSubmit = async (e) => {
        if (e.key === 'Enter' && grade !== '') {
            try {
                await actualizarCalificacion(entrega.entrega_id, grade);
                e.target.blur();
            } catch (error) {
                console.error("Error al actualizar la calificación:", error);
            }
        }
    };

    const handleGradeChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= 0 && Number(value) <= maxGrade)) {
            setGrade(value);
        }
    };

    return (
        <div className="entrega-item" onClick={onClick}>
            <div className="entrega-left">
                <span>{entrega.nombre_alumno}</span>
            </div>
            <div className="entrega-right">
                <div className="calif-section">
                    <input 
                        type="number" 
                        className="grade-input" 
                        placeholder="0"  
                        min={0} 
                        max={maxGrade}
                        value={grade}
                        onChange={handleGradeChange}
                        onKeyPress={handleGradeSubmit}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className="puntos">/{maxGrade}</span>
                </div>
            </div>
        </div>
    );
}

export default EntregaItem;