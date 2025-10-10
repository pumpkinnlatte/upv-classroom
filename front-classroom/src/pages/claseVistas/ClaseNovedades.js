import React from "react";
import AvisoForm from "../../forms/AvisoForm";
import PublicationItem from "../../components/PublicationItem";
import { Navigate } from "react-router-dom";
import { useClass } from '../../context/ClassContext';
import { usePublications } from '../../hooks/usePublications';
import "../../css/claseNovedades.css"

function ClaseNovedades({isTeacher}) {
    const { currentClass } = useClass();
    const { publications, loading, error, reloadPublications } = usePublications(currentClass?.clase_id);



    const getPublicationKey = (pub) => {
        switch(pub.type) {
            case 'aviso':
                return `aviso-${pub.aviso_id}`;
            case 'tarea':
                return `tarea-${pub.tarea_id}`;
            case 'material':
                return `material-${pub.material_id}`;
            default:
                return `publication-${Date.now()}-${Math.random()}`; // fallback unique key
        }
    };


    if (!currentClass) {
        return <Navigate to="/" />;
    }

    console.log("currentClass", currentClass);

    if (loading) {
        return;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content">
            <div className="center">
                <div className="center-title">
                    <div className="title-description">
                        <h1>{currentClass.nombre_clase}</h1>
                        <span>{currentClass.descripcion_clase}</span>
                    </div>
                </div>
                <div className="center-body">
                    {isTeacher && (
                        <div className="center-left">
                            <div className="code-data">
                                <label>Código de la clase</label>
                                <h3>{currentClass.codigo_grupo}</h3>
                            </div>
                            <AvisoForm onSuccess={reloadPublications} />
                        </div>
                    )}

                    <div className="center-right">
                        {publications.map((pub) => (
                            <PublicationItem 
                                key={getPublicationKey(pub)}
                                tipoPublicacion={pub.type}
                                pubData={pub}
                                nombreProfesor={currentClass.nombre_profesor}
                                classId={currentClass.clase_id} // Pass the class ID to the PublicationItem
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClaseNovedades;