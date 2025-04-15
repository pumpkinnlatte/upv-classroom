import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaArrowLeft } from 'react-icons/fa';
import { getTaskById, getEntregasByTarea, getArchivos, downloadArchivo } from '../services/apiGet';
import { actualizarCalificacion } from '../services/apiSend';
import './TaskDetailPage.css';

function TaskDetailPage() {
    const { classId, taskId } = useParams();
    const navigate = useNavigate();
    const [isTeacher, setIsTeacher] = useState(false);
    const [taskDetails, setTaskDetails] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gradeInputs, setGradeInputs] = useState({});

    const fetchTaskDetails = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getTaskById(taskId);
            setTaskDetails(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching task details:', error);
        } finally {
            setLoading(false);
        }
    }, [taskId]);

    const fetchSubmissions = useCallback(async () => {
        try {
            const data = await getEntregasByTarea(taskId);
            setSubmissions(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [taskId]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwtDecode(token);
            setIsTeacher(decoded.tipoUsuario === 'profesor');
        }
        fetchTaskDetails();
        if (isTeacher) {
            fetchSubmissions();
        }
    }, [taskId, isTeacher, fetchTaskDetails, fetchSubmissions]);

    const handleSubmissionClick = async (submission) => {
        setSelectedSubmission(submission);
        try {
            const response = await getArchivos(submission.entrega_id, "entrega");

            console.log("Archivos de la entrega:", response);

            setSelectedSubmission(prev => ({
                ...prev,
                archivos: response
            }));
        } catch (error) {
            setError('Error al obtener los archivos de la entrega');
            console.error(error);
        }
    };

    const handleGradeChange = (submissionId, event) => {
        const newGrade = event.target.value;
        if (taskDetails.puntos_max === undefined || newGrade === '' || (Number(newGrade) >= 0 && Number(newGrade) <= taskDetails.puntos_max)) {
            setGradeInputs(prev => ({
                ...prev,
                [submissionId]: newGrade
            }));
        }
    };

    const handleGradeSubmit = async (submissionId, event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            const newGrade = gradeInputs[submissionId];
            try {
                const response = await actualizarCalificacion(submissionId, newGrade);

                console.log('Response from server:', response);

                setSubmissions(submissions.map(sub => 
                    sub.entrega_id === submissionId 
                        ? { ...sub, calificacion: newGrade }
                        : sub
                ));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const goBack = () => {
        navigate(`/c/${classId}`);
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!taskDetails) return <div className="error">No se encontró la tarea</div>;

    return (
        <div className="task-detail-page">
            <button onClick={goBack} className="back-button">
                <FaArrowLeft /> Regresar
            </button>

            <header className="task-header">
                <h2>{taskDetails.tituloTarea}</h2>
                <p className="task-description">{taskDetails.descripcionTarea}</p>
                <p className="task-meta">
                    Fecha límite: {new Date(taskDetails.fecha_limite).toLocaleDateString()}
                    {isTeacher && ` | Calificación máxima: ${taskDetails.puntos_max ?? 'Sin calificación'}`}
                </p>
            </header>

            {isTeacher && (
                <div className="submissions-container">
                    <div className="submissions-list">
                        <h3>Entregas de los alumnos</h3>
                        {submissions.length > 0 ? (
                            <ul>
                                {submissions.map((submission) => (
                                    <li 
                                        key={submission.entrega_id} 
                                        className={`submission-item ${selectedSubmission?.entrega_id === submission.entrega_id ? 'selected' : ''}`}
                                        onClick={() => handleSubmissionClick(submission)}
                                    >
                                        <div className="submission-info">
                                            <span className="student-name">{submission.nombre_alumno}</span>
                                            <div className="grade-input">
                                                {taskDetails.puntos_max ? (
                                                    <>
                                                        <input
                                                            type="number"
                                                            value={gradeInputs[submission.entrega_id] ?? submission.calificacion ?? ''}
                                                            onChange={(e) => handleGradeChange(submission.entrega_id, e)}
                                                            onKeyPress={(e) => handleGradeSubmit(submission.entrega_id, e)}
                                                            onBlur={(e) => handleGradeSubmit(submission.entrega_id, e)}
                                                            min="0"
                                                            max={taskDetails.puntos_max}
                                                            placeholder="-"
                                                        />
                                                        /{taskDetails.puntos_max}
                                                    </>
                                                ) : (
                                                    <span>Entregada</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-submissions">No hay entregas todavía</p>
                        )}
                    </div>

                    {selectedSubmission && (
                        <div className="submission-details">
                            <h3>Archivos de la entrega</h3>
                            {selectedSubmission.archivos?.length > 0 ? (
                                <ul className="files-list">
                                    {selectedSubmission.archivos.map((file) => {
                                        const uploadYear = new Date(file.fecha_creacion).getFullYear();
                                        return (
                                            <li key={file.archivo_id} className="file-item">
                                                <a 
                                                    href="#"
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        try {
                                                            const blob = await downloadArchivo(classId, uploadYear, file.nombre_en_storage);
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
                                                    }}
                                                >
                                                    {file.nombre_original}
                                                </a>
                                                <span className="file-date">
                                                    {new Date(file.fecha_creacion).toLocaleDateString()}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="no-files">No hay archivos en esta entrega</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TaskDetailPage;