import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/utils";

function WorkItem({tipoTrabajo, workData, nombreProfesor, classId}) {
    const navigate = useNavigate();
    let icon = "";
    let dateMessage = "";
    let linkTo = "";

    if(tipoTrabajo === "material"){
        icon = "/svg/icons8-book.svg";
        dateMessage = "Publicado: ";
        linkTo = `/t/${classId}/material/${workData.material_id}`;
    }

    if(tipoTrabajo === "tarea"){

        icon = "/svg/icons8-brief.svg";
        dateMessage = "Fecha de entrega: ";
        linkTo = `/t/${classId}/tarea/${workData.tarea_id}`;
    }

    const handleClick = () => {
        navigate(linkTo);
    };

    return (
        <div 
            className="trabajo-item" 
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="trabajo-header">
                <div className="trabajo-icon">
                    <img src={icon} alt="user icon" width={24}/>
                </div>
            </div>

            <div className="trabajo-content">
                <div className="content-left">   
                    <span className="trabajo-title">{workData.titulo}</span>
                </div>
                <div className="content-right">   
                    <div className="trabajo-fechas">
                        <p>{dateMessage}</p>
                        <p>{formatDate(workData.fecha_publicacion)}</p>
                    </div>
                </div>     
            </div> 
        </div>
    );
}

export default WorkItem;