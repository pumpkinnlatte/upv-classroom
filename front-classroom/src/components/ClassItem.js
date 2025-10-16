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
            <div className="class-item-header blue-i">
                <div className="ih-wrapp alice-blue-i">
                    {classData.nombre_clase}
                </div>
                <span className="alice-blue">{classData.carrera}</span>
                <p className="alice-blue">{classData.nombre_profesor}</p> 
            </div>
            <div className="class-space">

            </div>
            <div className="class-item-footer">
                <button className="btn">Ver Clase</button>
            </div>
        </div>
    );
}

export default ClassItem;