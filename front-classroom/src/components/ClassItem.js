import React from "react";
import { useNavigate } from "react-router-dom";
import { useClass } from '../context/ClassContext';

function ClassItem({ classData }) {
    const navigate = useNavigate();
    const { setCurrentClass } = useClass();

    const handleClick = () => {
        setCurrentClass(classData);
        navigate(`/c/${classData.clase_id}/novedades`);
    };

    return (
        <div className="class-item" onClick={handleClick}>
            <div className="class-item-header">
                <div className="ih-wrapp">
                    <h2>{classData.nombre_clase}</h2>
                    <p>{classData.carrera}</p>
                </div>
                <span>{classData.nombre_profesor}</span> 
            </div>
            <div className="class-item-footer">
                <button className="btn">Ver Clase</button>
            </div>
        </div>
    );
}

export default ClassItem;