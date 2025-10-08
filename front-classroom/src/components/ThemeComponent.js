import React from "react";
import WorkItem from "./WorkItem";

function ThemeComponent({themeData, worksArray, currentClass}){
    
    const themeWorks = worksArray ? worksArray.filter(work => work.themeId === themeData.id) : [];
    
    const getWorkKey = (work) => {
        switch(work.tipoTrabajo) {
            case 'tarea':
                return `tarea-${work.tarea_id}`;
            case 'material':
                return `material-${work.material_id}`;
            default:
                return `work-${Date.now()}-${Math.random()}`;
        }
    };

    const renderWorks = () => (
        <div className="theme-works">
            {themeWorks.map(work => (
                <WorkItem 
                    key={getWorkKey(work)}
                    tipoTrabajo={work.tipoTrabajo}
                    workData={work}
                    nombreProfesor={currentClass.nombre_profesor}
                    classId={currentClass.clase_id}
                />
            ))}
        </div>
    );

    return(
        <>
            {themeData.nombre_tema !== "" ? 
                <div className="theme-component">
                    <div className="theme-title">
                        <h3>{themeData.nombre_tema}</h3>
                    </div>
                    {renderWorks()}
                </div>
                : 
                <div className="no-theme">
                    <div className="theme-title">
                        <h3>{themeData.nombre_tema}</h3>
                    </div>
                    {renderWorks()}
                </div>
            }
        </>
    );  
}

export default ThemeComponent;