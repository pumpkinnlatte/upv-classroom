import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMaterialDetail } from "../../hooks/useMaterialDetail";
import { formatDate } from "../../services/utils";
import { getArchivos, downloadArchivo } from "../../services/apiGet";
import "../../css/publicationDetail.css"

function MaterialDetail() {
    const materialId = useParams().workId;
    const { material, loading, error } = useMaterialDetail(materialId);
    const [materialFiles, setMaterialFiles] = useState([]);

    useEffect(() => {
        if (material) {
            const fetchMaterialFiles = async () => {
                try {
                    const files = await getArchivos(materialId, "material");
                    setMaterialFiles(files);
                } catch (error) {
                    console.error("Error fetching material files:", error);
                }
            };
            fetchMaterialFiles();
        }
    }, [material, materialId]);

    if (loading) return;
    if (error) return <div>Error: {error}</div>;
    if (!material) return <div>No se encontró el material</div>;

    return (
        <div className="content">
            <div className="center">
                <div className="center-body">
                    <div className="center-right">
                        <div className="publication-detail">
                            <div className="detail-left">
                                <div className="publication-icon">
                                    <img src="/svg/icons8-book.svg" alt="user icon" width={24}/>
                                </div>
                            </div>
                            <div className="detail-right">
                                <div className="detail-header">
                                    <h3>{material.titulo_material}</h3>
                                    <div className="header-top">
                                        <span>{material.nombre_profesor}</span>
                                        <span>{formatDate(material.fecha_publicacion, false)}</span>
                                    </div>
                                </div>
                                <div className="detail-content">
                                    <p>{material.descripcion_material}</p>
                                    <div className="archivos-adjuntos">
                                        {materialFiles.map(file => (
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

export default MaterialDetail;