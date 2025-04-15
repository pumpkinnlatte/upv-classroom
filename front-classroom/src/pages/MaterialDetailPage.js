import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getMaterialById, getArchivos, downloadArchivo } from '../services/apiGet';
import './MaterialDetailPage.css';

function MaterialDetailPage() {
    const { classId, materialId } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterialDetails = async () => {
            try {
                setLoading(true);
                const data = await getMaterialById(materialId);
                setMaterial(data);

                const filesData = await getArchivos(materialId, "material");
                setFiles(filesData);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching material details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterialDetails();
    }, [materialId]);

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
    if (!material) return <div className="error">No se encontró el material</div>;

    return (
        <div className="material-detail-page">
            <button onClick={() => navigate(`/c/${classId}`)} className="back-button">
                <FaArrowLeft /> Regresar
            </button>

            <div className="material-content">
                <header className="material-header">
                    <h2>{material.titulo_material}</h2>
                    <span className="material-date">
                        {new Date(material.fecha_publicacion).toLocaleDateString()}
                    </span>
                </header>

                <div className="material-body">
                    <p className="material-description">{material.descripcion_material}</p>
                </div>

                {files.length > 0 && (
                    <div className="material-files">
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

export default MaterialDetailPage;