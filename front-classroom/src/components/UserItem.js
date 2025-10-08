import React from "react";

function UserItem ({alumnoData}){

    let icon = "";

    if(alumnoData.tipoUsuario === "alumno"){
        icon = "/svg/icons8-user.svg";
    }

    if(alumnoData.tipoUsuario === "profesor"){
        icon = "/svg/icons8-popular-man.svg";
    }

    return (
        <div className="user-item">
            <div className="user-left">
                <div className="publication-icon">
                    <img src={icon} alt="user icon" width={24}/>
                </div>
            </div>

            <div className="publication-content">
                <span>{alumnoData.nombreUsuario}</span>

                {alumnoData.tipoUsuario === "alumno" ?
                    <span>{alumnoData.matricula}</span> :
                    null
                }
            </div> 
        </div>
    );
}

export default UserItem ;