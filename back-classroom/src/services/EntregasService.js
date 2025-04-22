const db = require("../data-access/db"); //Acceso a la base de datos

class EntregasService {

    async entregarTarea(tareaData) {
        const sql = "INSERT INTO entregas (tarea_id, alumno_id, fecha_entrega, estado, calificacion, has_file) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [tareaData.tareaId, tareaData.alumnoId, tareaData.fechaEntrega, tareaData.estado, tareaData.calificacion, tareaData.hasFile]);
    
        return {message: "Tarea entregada con éxito", entregaId: result[0].insertId};
    }
    
    async calificarEntrega(calData) {
        const sql = "UPDATE entregas SET calificacion = ?, estado = ? WHERE entrega_id = ?";
        const result = await db.query(sql, [calData.calificacion, "calificado", calData.entregaId]);
        return {message: "Tarea calificada con éxito", entregaId: calData.entregaId, calificacion: calData.calificacion};
    }

    async getEntregasPorTarea(tareaId) {
        const sql = `
            SELECT e.entrega_id, e.fecha_entrega, e.estado, e.calificacion, e.has_file, u.nombre AS nombre_alumno
            FROM entregas e
            JOIN usuarios u ON e.alumno_id = u.usuario_id
            WHERE e.tarea_id = ?
            ORDER BY e.fecha_entrega DESC
        `;
        const [rows] = await db.query(sql, [tareaId]); // Extrae solo las filas
        return rows; // Devuelve las entregas asociadas a la tarea
    }

    async getEntregasPorId(entregaId) {
        try {
            if (!entregaId) {
                throw new Error('ID de entrega no proporcionado');
            }
            const [rows] = await db.query('SELECT * FROM entregas WHERE entrega_id = ?', [entregaId]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error in getEntregasPorId:', error);
            throw error;
        }
    }

    async getEntregaPorTareaYAlumno(tareaId, alumnoId) {
        const sql = `
            SELECT e.entrega_id, e.fecha_entrega, e.estado, e.calificacion, e.has_file
            FROM entregas e
            WHERE e.tarea_id = ? AND e.alumno_id = ?
        `;
        
        console.log("alumnoId", alumnoId);

        const [rows] = await db.query(sql, [tareaId, alumnoId]);
        return rows[0] || null; // Devuelve la entrega del alumno para la tarea dada
    }

}

module.exports = new EntregasService;