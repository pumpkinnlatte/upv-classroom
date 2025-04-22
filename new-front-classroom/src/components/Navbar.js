import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useClass } from "../context/ClassContext";
import { getUserRole } from "../context/AuthContext";
import { JoinClassForm } from "../forms/JoinClassForm";
import "../css/navbar.css";

function Navbar({ mostrarSectionBar, mostrarLogOut}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentClass, clearCurrentClass } = useClass();
    const isHome = location.pathname === '/';

    const handleLogout = async () => {
        try {
            clearCurrentClass(); // Limpiar la clase actual
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };

    const handleButtonClick = () => {
        navigate('/a/nuevo-clase');    
    };

    return (
        <>
            <nav className="nav-bar">
                <div className="nav-left">
                    <div className="title">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} className="title-link">
                            <h3>Classroom</h3>
                        </Link>
                    </div>
                    {!isHome && currentClass && (
                        <>
                            <div className="medium">
                                <img className="svg-img" src="/svg/icons8-forward.svg" alt="Imagen SVG" width={25}></img>
                            </div>
                            <div className="class-data">
                                <div className="class-name">
                                    <Link to={`/c/${currentClass.clase_id}/novedades`} style={{ textDecoration: 'none', color: 'inherit' }} className="class-link">
                                        <h4 className="nom-clase">{currentClass.nombre_clase}</h4>
                                    </Link>
                                </div>
                                <div className="class-carrera">
                                    <Link to={`/c/${currentClass.clase_id}/novedades`} style={{ textDecoration: 'none', color: 'inherit' }} className="class-link">
                                        <span>{currentClass.carrera}</span>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="nav-right">

                    <div className="log-out">

                        {mostrarLogOut && getUserRole() === 'profesor' ?
                            
                            <button className="btn-1" onClick={handleButtonClick}>
                                Crear Clase
                            </button>    
                            : null
                        }

                        {mostrarLogOut && getUserRole() === 'alumno' ?
                            
                            <JoinClassForm />
                            : null
                        }

                        { mostrarLogOut ? 
                        
                                <button className="btn-3" onClick={handleLogout}>Cerrar Sesion</button>

                            : null
                        }

                    </div>
                </div>
            </nav>
            {mostrarSectionBar && currentClass ? <SectionBar classId={currentClass.clase_id} /> : null}
        </>
    );
}

function SectionBar({ classId }) {
    const location = useLocation();

    const isSelected = (path) => {
        return location.pathname.endsWith(path);
    };

    return (
        <div className="section-bar">
            <ul className="section-options">
                <li className={`section-option ${isSelected('/novedades') ? 'selected' : ''}`}>
                    <Link to={`/c/${classId}/novedades`} className="section-link">Clase</Link>
                </li>
                <li className={`section-option ${isSelected('/trabajo') ? 'selected' : ''}`}>
                    <Link to={`/c/${classId}/trabajo`} className="section-link">Tareas</Link>
                </li>
                <li className={`section-option ${isSelected('/personas') ? 'selected' : ''}`}>
                    <Link to={`/c/${classId}/personas`} className="section-link">Personas</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;