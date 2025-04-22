import React, { createContext, useContext, useState, useEffect } from 'react';

const ClassContext = createContext();

export function ClassProvider({ children }) {
    const [currentClass, setCurrentClass] = useState(() => {
        // Recuperar la clase del localStorage al iniciar
        const savedClass = localStorage.getItem('currentClass');
        return savedClass ? JSON.parse(savedClass) : null;
    });

    // Guardar la clase en localStorage cada vez que cambie
    useEffect(() => {
        if (currentClass) {
            localStorage.setItem('currentClass', JSON.stringify(currentClass));
        }
    }, [currentClass]);

    const clearCurrentClass = () => {
        setCurrentClass(null);
        localStorage.removeItem('currentClass');
    };

    return (
        <ClassContext.Provider value={{ currentClass, setCurrentClass, clearCurrentClass }}>
            {children}
        </ClassContext.Provider>
    );
}

export function useClass() {
    const context = useContext(ClassContext);
    if (!context) {
        throw new Error('useClass must be used within a ClassProvider');
    }
    return context;
}