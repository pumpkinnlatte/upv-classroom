import React, { useEffect, useState } from "react";
import ClassItem from "../components/ClassItem";
import { getClassByUser } from "../services/apiGet";
import "../css/home.css";

function HomePage(){
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        try {
            const response = await getClassByUser();
        
            if (!response) {
                throw new Error('No se recibieron datos de las clases');
            }
            
            setClasses(response);
        } catch (error) {
            console.error('Error detallado:', error);
        } 
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="home-page">
            <div className="class-list">
                {classes.map((classData) => (
                    <ClassItem key={classData.clase_id} classData={classData} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;