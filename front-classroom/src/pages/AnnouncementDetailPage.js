import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAvisoById, getArchivos, downloadArchivo } from '../services/apiGet';
import './AnnouncementDetailPage.css';

function AnnouncementDetailPage() {
    const { classId, announcementId } = useParams();
    const navigate = useNavigate();
    const [announcement, setAnnouncement] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncementDetails = async () => {
            try {
                setLoading(true);
                const data = await getAvisoById(announcementId);
                setAnnouncement(data);

                const filesData = await getArchivos(announcementId, "aviso");
                setFiles(filesData);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching announcement details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncementDetails();
    }, [announcementId]);

    const handleDownload = async (file) => {
        try {
            const blob = await downloadArchivo(classId, new Date(file.fecha_creacion).getFullYear(), file.nombre_en_storage);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.nombre_original;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar:', error);
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!announcement) return <div className="error">No se encontró el aviso</div>;

    return (
        <div className="announcement-detail-page">
            <button onClick={() => navigate(`/c/${classId}`)} className="back-button">
                <FaArrowLeft /> Regresar
            </button>

            <div className="announcement-content">
                <header className="announcement-header">
                    <h2>{announcement.titulo_aviso}</h2>
                    <span className="announcement-date">
                        {new Date(announcement.fecha_publicacion).toLocaleDateString()}
                    </span>
                </header>

                <div className="announcement-body">
                    <p className="announcement-description">{announcement.descripcion_aviso}</p>
                </div>

                {files.length > 0 && (
                    <div className="announcement-files">
                        <h3>Archivos adjuntos</h3>
                        <ul className="files-list">
                            {files.map((file) => (
                                <li key={file.archivo_id} className="file-item">
                                    <button 
                                        onClick={() => handleDownload(file)}
                                        className="file-download-button"
                                    >
                                        {file.nombre_original}
                                    </button>
                                    <span className="file-date">
                                        {new Date(file.fecha_creacion).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnnouncementDetailPage;