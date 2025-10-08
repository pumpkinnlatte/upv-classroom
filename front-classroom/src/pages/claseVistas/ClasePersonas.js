import React, { useState, useEffect } from "react";
import { getStudents } from "../../services/apiGet";
import { useClass } from "../../context/ClassContext";
import UserItem from "../../components/UserItem";
import { useNavigate } from "react-router-dom";
import "../../css/clasePersonas.css"

function ClasePersonas ({isTeacher}){
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const { currentClass } = useClass();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getStudents(currentClass.clase_id);
                console.log("claseId:", currentClass.clase_id);
                setStudents(response);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };



        fetchStudents();
    }, [currentClass]);

    const handleButtonClick = () => {
        navigate(`/c/${currentClass.clase_id}/nuevo-alumno`);    
    };


    return(
        <div className="content">
            <div className="center">
                <div className="center-body">
                    <div className="center-right">
                        <div className="profesor-section">
                            <div className="profesor-title">
                                <h2>Profesor</h2>
                            </div>
                            <UserItem alumnoData={{tipoUsuario: "profesor", nombreUsuario: currentClass.nombre_profesor, matricula: ""}}/>
                        </div>
                        <div className="alumnos-section">
                            <div className="alumnos-title">
                                {isTeacher ? 
                                    <h2>Alumnos Inscritos</h2> :
                                    <h2>Compañeros de clase</h2>
                                }
                                <div className="alumnos-info">
                                    <span>{students.length} alumnos</span>
                                    {isTeacher ?
                                        <button className="add-user-button" onClick ={handleButtonClick}>
                                            <img src="/svg/icons8-add-user-male.svg" alt="user icon" width={24}/>
                                        </button>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="alumnos-list">
                                {loading ? (
                                    <p>Cargando alumnos...</p>
                                ) : (
                                    students.map(student => (
                                        <UserItem 
                                            key={student.matricula}
                                            alumnoData={{
                                                tipoUsuario: "alumno",
                                                nombreUsuario: student.nombre,
                                                matricula: student.matricula
                                            }}
                                        />
                                        
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default ClasePersonas;