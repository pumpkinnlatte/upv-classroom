import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../services/utils";

function PublicationItem({tipoPublicacion, pubData, nombreProfesor, classId}) {
    const navigate = useNavigate();
    let icon = "";
    let inter = "";
    let linkTo = "";

    if(tipoPublicacion === "material"){
        inter = "nuevo material";
        icon = "/svg/icons8-book.svg";
        linkTo = `/t/${classId}/material/${pubData.material_id}`;
    }

    if(tipoPublicacion === "tarea"){
        inter = "una nueva tarea";
        icon = "/svg/icons8-brief.svg";
        linkTo = `/t/${classId}/tarea/${pubData.tarea_id}`;
    }

    if(tipoPublicacion === "aviso"){
        inter = "un nuevo aviso";
        icon = "/svg/icons8-notification.svg";
        linkTo = `/t/${classId}/aviso/${pubData.aviso_id}`;
    }

    const handleClick = () => {
        navigate(linkTo);
    };

    return (
        <div 
            className="publication-item" 
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="publication-left">
                <div className="publication-icon">
                    <img src={icon} alt="user icon" width={24}/>
                </div>
            </div>

            <div className="publication-content">
                <span className="publication-title">{nombreProfesor} publicó {inter}: {pubData.titulo}</span>
                <p className="publication-date">{formatDate(pubData.date)}</p>
                {tipoPublicacion === "aviso" ? 
                    <div className="publication-text">
                        <p>{pubData.descripcion_aviso}</p>
                    </div> : null
                }
            </div>
        </div>
    );
}

export default PublicationItem;