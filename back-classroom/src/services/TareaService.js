const db = require("../data-access/db"); //Acceso a la base de datos

class TareasService {

    //TAREAS
    async crearTarea(tareaData) {
        const sql = "INSERT INTO tareas (titulo_tarea, descripcion_tarea, fecha_publicacion, fecha_limite, tema_id, clase_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [tareaData.tituloTarea, tareaData.descripcionTarea, tareaData.fechaPublicacion, tareaData.fechaLimite, tareaData.temaId, tareaData.claseId]);
        return {message: "Tarea creada con éxito", tareaId: result.insertId, tituloTarea: tareaData.tituloTarea, fechaPublicacion: tareaData.fechaPublicacion, fechaLimite: tareaData.fechaLimite};
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


}

module.exports = new TareasService;