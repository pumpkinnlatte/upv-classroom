import React from "react";
import { useParams } from "react-router-dom";
import { useAvisoDetail } from "../../hooks/useAvisoDetail";
import { formatDate } from "../../services/utils";
import { downloadArchivo } from "../../services/apiGet";
import { useClass } from "../../context/ClassContext";
import "../../css/publicationDetail.css"

function AvisoDetail() {    
    const avisoId = useParams().workId;
    const { currentClass } = useClass();
    const { aviso, avisoFiles, loading, error } = useAvisoDetail(avisoId);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!aviso) return <div>No se encontró el aviso</div>;

    return (
        <div className="content">
            <div className="center">
                <div className="center-body">
                    <div className="center-right">
                        <div className="publication-detail">
                            <div className="detail-left">
                                <div className="publication-icon">
                                    <img src="/svg/icons8-notification.svg" alt="notification icon" width={24}/>
                                </div>
                            </div>
                            <div className="detail-right">
                                <div className="detail-header">
                                    <h3>{aviso.titulo_aviso}</h3>
                                    <div className="header-top">
                                        <span>{currentClass.nombre_profesor}</span>
                                        <span>{formatDate(aviso.fecha_publicacion, false)}</span>
                                    </div>
                                </div>
                                <div className="detail-content">
                                    <p>{aviso.descripcion_aviso}</p>
                                    <div className="archivos-adjuntos">
                                        {avisoFiles.map(file => (
                                            <div key={file.archivo_id} className="archivo-item">
                                                <span>{file.nombre_original}</span>
                                                <button 
                                                    onClick={() => downloadArchivo(
                                                        file.clase_id,
                                                        new Date(file.fecha_creacion).getFullYear(),
                                                        file.nombre_en_storage,
                                                        file.nombre_original
                                                    )}
                                                    className="download-link"
                                                    type="button"
                                                >
                                                    Descargar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvisoDetail;