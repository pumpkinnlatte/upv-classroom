import React from "react";
import { useNavigate } from "react-router-dom";

function AnuncioAlgoItem({classId}) {
    const navigate = useNavigate();
    let icon = "/svg/icons8-user.svg";
    let linkTo = "";
    //Desplegar el formulario para crear un nuevo anuncio
    const handleClick = () => {
        navigate(linkTo);
    };

    return (
        <div 
            className="publication-item" 
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="publication-header">
                <div className="publication-left">
                    <div className="publication-icon">
                        <img src={icon} alt="user icon" width={24}/>
                    </div>
                </div>

                <div className="publication-content">
                        <p className="s-hver">Anuncia algo a tu clase.</p>
                </div>
            </div>
        </div>
    );
}

export default AnuncioAlgoItem;