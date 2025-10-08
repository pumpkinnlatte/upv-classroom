import React from "react";
import { useEntregaForm } from "../hooks/useEntregaForm";
import { useClass } from "../context/ClassContext";

function EntregaForm({ existingEntrega, tareaId }) {
    const { currentClass } = useClass();
    const { 
        selectedFiles,
        loading,
        error,
        handleFileChange,
        handleSubmit
    } = useEntregaForm(tareaId, currentClass.clase_id);

    const getStatusText = () => {
        if (!existingEntrega) return "Sin entregar";
        if (existingEntrega.estado === "entregado") return "Pendiente de revisión";
        if (existingEntrega.estado === "calificado") return `Calificación: ${existingEntrega.calificacion}`;
        return "Sin entregar";
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }} className="entrega-form">
            <div className="form-header">
                <span className="status">{getStatusText()}</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="archivos-adjuntos">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="archivo-item">
                        <span>{file.name}</span>
                    </div>
                ))}
            </div>

            {!existingEntrega && (
                <>
                    <input
                        type="file"
                        id="file-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        multiple
                    />
                    <label htmlFor="file-input" className="btn-2">
                        Adjuntar un archivo
                    </label>
                    <button type="submit" className="btn-1">
                        Enviar
                    </button>
                </>
            )}
        </form>
    );
}

export default EntregaForm;