import React from "react";
import ThemeComponent from "../../components/ThemeComponent";
import { Link } from 'react-router-dom';
import { useParams, Navigate } from "react-router-dom";
import { useClass } from '../../context/ClassContext';
import {useClassWorks} from '../../hooks/useClassWorks';
import"../../css/claseTrabajo.css"

function ClaseTrabajo ({isTeacher}){

    const { id } = useParams();
    const { currentClass } = useClass();
    
    // Usar useMemo para evitar que classId cambie en cada render
    const classId = React.useMemo(() => currentClass?.clase_id, [currentClass]);
    const { topics, tasks, materials, loading, error } = useClassWorks(classId);

    if (!currentClass) {
        return <Navigate to="/" />;
    }

    if (loading) return;
    if (error) return <div>Error: {error}</div>;

    // Combinamos las tareas y los materiales en un solo array
    const worksArray = [
        ...tasks.map(task => ({ ...task, tipoTrabajo: 'tarea', titulo: task.titulo_tarea })),
        ...materials.map(material => ({ ...material, tipoTrabajo: 'material', titulo: material.titulo_material }))
    ];

    console.log(worksArray);


    return(
        <div className="content">
            <div className="center">
                <div className="center-body">

                    {isTeacher ? 
                        <div className="center-left">
                            <div className="create-options">
                                <Link to={`/t/${id}/nueva-tarea`} style={{ textDecoration: 'none' }}>
                                    <button className="btn-2">
                                        <div className="btn-center">
                                            <img src="/svg/icons8-brief-blue.svg" alt="user icon" width={26}/>
                                            Nueva Tarea
                                        </div>
                                    </button>
                                </Link>
                                <Link to={`/t/${id}/nuevo-material`} style={{ textDecoration: 'none' }}>
                                    <button className="btn-2">
                                        <div className="btn-center">
                                            <img src="/svg/icons8-book-blue.svg" alt="user icon" width={26}/>
                                            Nuevo Material
                                        </div>
                                    </button>
                                </Link>
                                <Link to={`/t/${id}/nuevo-tema`} style={{ textDecoration: 'none' }}>
                                    <button className="btn-2">
                                        <div className="btn-center">
                                            <img src="/svg/icons8-bookmark-blue.svg" alt="user icon" width={26}/>
                                            Nuevo Tema
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div> : null
                    }

                    <div className="center-right">
                        {/* Mostrar trabajos sin tema asignado */}
                        {worksArray.filter(work => !work.tema_id).length > 0 && (
                            <ThemeComponent 
                                key="sin-tema"
                                themeData={{ tema_id: 'sin-tema', nombre_tema: '' }}
                                worksArray={worksArray.filter(work => !work.tema_id)}
                                currentClass={currentClass}
                            />
                        )}
                        
                        {/* Mostrar trabajos con tema asignado */}
                        {topics.map(theme => (
                            <ThemeComponent 
                                key={theme.tema_id}
                                themeData={theme}
                                worksArray={worksArray.filter(work => work.tema_id === theme.tema_id)}
                                currentClass={currentClass}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ClaseTrabajo;