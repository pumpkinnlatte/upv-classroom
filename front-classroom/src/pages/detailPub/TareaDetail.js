import { React, useState, useEffect } from "react";
import EntregaForm from "../../forms/EntregaForm";
import EntregaItem from "../../components/EntregaItem";
import { useTareaDetail } from "../../hooks/useTareaDetail";
import { formatDate } from "../../services/utils"; 
import { useParams } from "react-router-dom";
import"../../css/publicationDetail.css"
import { getArchivos, getEntregasByTarea } from "../../services/apiGet";

function TareaDetail ({isTeacher}){
    const tareaId = useParams().workId;
    const [studentEntrega, setStudentEntrega] = useState(null);
    const { tarea, entregas, loading, error } = useTareaDetail(tareaId, isTeacher);
    const [tareaFiles, setTareaFiles] = useState([]);
    const [selectedEntregaFiles, setSelectedEntregaFiles] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState(''); 

    useEffect(() => {
        
            const fetchStudentEntrega = async () => {
                try {
                    const data = await getEntregasByTarea(tareaId);

                    console.log("data", data);
                    setStudentEntrega(data);
                } catch (error) {
                    console.error("Error fetching student submission:", error);
                }
            };
            fetchStudentEntrega();
        
    }, [tareaId, isTeacher, tarea]);

    useEffect(() => {
        if (tarea) {
            const fetchTareaFiles = async () => {
                try {
                    const files = await getArchivos(tareaId, "tarea");
                    setTareaFiles(files);
                } catch (error) {
                    console.error("Error fetching task files:", error);
                }
            };
            fetchTareaFiles();
        }
    }, [tarea, tareaId]);

    const handleEntregaClick = async (entregaId) => {
        try {
            const files = await getArchivos(entregaId, "entrega");
            setSelectedEntregaFiles(files);
            const entrega = entregas.find(e => e.entrega_id === entregaId);
            if (entrega) {
                setFechaEntrega(entrega.fecha_entrega);
                setStudentName(entrega.nombre_alumno);
            }
        } catch (error) {
            console.error("Error fetching submission files:", error);
        }
    };

    const downloadArchivo = (claseId, year, storageName, originalName) => {
        const url = `/api/archivos/download/${claseId}/${year}/${storageName}`;
        const link = document.createElement("a");
        link.href = url;
        link.download = originalName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!tarea) return <div>No se encontró la tarea</div>;

    return (
        <div className="content">
            {
                isTeacher === true ?
                    <div className="center-wrapper">            
                        <div className="center-tarea-left">
                            <div className="top-tarea">

                                <div className="top-tarea-info">
                                    <span className="p-text">Puntuacion Asignada:</span>
                                    <span className="p-asignada">{tarea.puntos_max}</span>
                                </div>
                                <div className="top-tarea-ex">
                                    <span>({entregas.length}) Tareas Entregadas</span>
                                </div>
                            </div>
                            <div className="entregas-lista">
                                {entregas.map((entrega) => (
                                    <EntregaItem 
                                        key={entrega.entrega_id}
                                        entrega={entrega}
                                        onClick={() => handleEntregaClick(entrega.entrega_id)}
                                        maxGrade={tarea.puntos_max}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="center-tarea">
                            <div className="entrega-header">
                                <h2>{studentName}</h2>
                                <span>Fecha de entrega: {fechaEntrega ? formatDate(fechaEntrega) : ''}</span>
                            </div>

                            <div className="entrega-content">
                                <div className="archivos-adjuntos">
                                    {selectedEntregaFiles.map(file => (
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
                :   
                
                <div className="center">
                    <div className="center-body">
                        <div className="center-right">
                            <div className="publication-detail">
                                    <div className="detail-left">
                                        <div className="publication-icon">
                                            <img src="/svg/icons8-brief.svg" alt="user icon" width={24}/>
                                        </div>
                                    </div>
                                    <div className="detail-right">
                                        <div className="detail-header">
                                            <div className="header-top">
                                                <h1>{tarea.titulo_tarea}</h1>
                                                <div className="header-top-details">
                                                    <p>Luis Roberto</p>
                                                    <p>{formatDate(tarea.fecha_publicacion, false)}</p>
                                                </div>
                                            </div>
                                            <div className="header-bottom">
                                                <span className="puntos">{tarea.puntos_max} puntos</span>
                                                <span className="date">Fecha limite: {formatDate(tarea.fecha_publicacion)}</span>
                                            </div>
                                        </div>
                                        <div className="detail-content">
                                            <p>{tarea.descripcion_tarea}</p>
                                            <div className="archivos-adjuntos">
                                                {tareaFiles.map(file => (
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
                        <div className="center-left">
                            <EntregaForm  
                                existingEntrega={studentEntrega}
                                tareaId={tareaId}/>
                        </div>
                        
                    </div>
                </div>
            }

            
        </div>
    );
}

export default TareaDetail