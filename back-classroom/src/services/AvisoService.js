const db = require("../data-access/db"); //Acceso a la base de datos

class AvisoService {

    async agregarAviso(avisoData) {
        try {
            const sql = `INSERT INTO avisos (clase_id, titulo_aviso, descripcion_aviso, fecha_publicacion, has_file) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await db.query(sql, [avisoData.clase_id, avisoData.titulo, avisoData.descripcion, avisoData.fechaPublicacion, avisoData.hasFile]);
            
            return {
                success: true,
                message: "Aviso creado con éxito", 
                avisoId: result.insertId,
                titulo: avisoData.titulo
            };
        } catch (error) {
            console.error('Error en agregarAviso:', error);
            throw error;
        }
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

    async getAvisoById(avisoId) {
        const sql = `
            SELECT aviso_id, titulo_aviso, descripcion_aviso, fecha_publicacion
            FROM avisos
            WHERE aviso_id = ?
        `;
        const [rows] = await db.query(sql, [avisoId]); // Extrae solo las filas
        return rows[0]; // Devuelve el aviso asociado al ID
    }
}

module.exports = new AvisoService;