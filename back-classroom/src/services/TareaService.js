const db = require("../data-access/db"); //Acceso a la base de datos

class TareasService {

    //TAREAS
    async crearTarea(tareaData) {
        const sql = "INSERT INTO tareas (titulo_tarea, descripcion_tarea, fecha_publicacion, fecha_limite, puntos_max, tema_id, clase_id, has_file) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [
            tareaData.tituloTarea,
            tareaData.descripcionTarea,
            tareaData.fechaPublicacion,
            tareaData.fechaLimite,
            tareaData.puntosMax,
            tareaData.temaId,
            tareaData.claseId,
            tareaData.hasFile
        ]);
        return {
            message: "Tarea creada con éxito",
            tareaId: result[0].insertId,
            tituloTarea: tareaData.tituloTarea,
            fechaPublicacion: tareaData.fechaPublicacion,
            fechaLimite: tareaData.fechaLimite
        };
    }

    async getTareasPorClase(claseId) {
        const sql = `
            SELECT tarea_id, titulo_tarea, descripcion_tarea, fecha_publicacion, fecha_limite, tema_id, clase_id
            FROM tareas
            WHERE clase_id = ?
            ORDER BY fecha_publicacion DESC
        `;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve las tareas asociadas a la clase
    }

    async getTareaPorId(tareaId) {
        try {
            if (!tareaId) {
                throw new Error('ID de tarea no proporcionado');
            }
            const [rows] = await db.query('SELECT * FROM tareas WHERE tarea_id = ?', [tareaId]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error in getTareaPorId:', error);
            throw error;
        }
    }


}

module.exports = new TareasService;