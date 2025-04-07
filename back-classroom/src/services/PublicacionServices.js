const db = require("../data-access/db"); //Acceso a la base de datos

class PublicacionService {

    async agregarAviso(avisoData) {
        const sql = `INSERT INTO avisos (clase_id, titulo_aviso, descripcion_aviso, fecha_publicacion) VALUES (?, ?, ?, ?)`;
        const result = await db.query(sql, [avisoData.clase_id, avisoData.titulo, avisoData.descripcion, avisoData.fechaPublicacion,]);
        return {message: "Aviso creado con éxito", avisoId: result.insertId, tituloAviso: avisoData.titulo};
    }

    async getAvisosPorClase(claseId) {
        const sql = `
            SELECT aviso_id, titulo_aviso, descripcion_aviso, fecha_publicacion
            FROM avisos
            WHERE clase_id = ?
            ORDER BY fecha_publicacion DESC
        `;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve los avisos asociados a la clase
    }
}

module.exports = new PublicacionService;