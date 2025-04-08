const db = require("../data-access/db"); //Acceso a la base de datos

class TareasService {

    //Materiales
    async crearMaterial(materialData) {
        const sql = "INSERT INTO materiales (titulo_material, descripcion_material, fecha_publicacion, tema_id, clase_id) VALUES (?, ?, ?, ?, ?)";
        const result = await db.query(sql, [materialData.tituloMaterial, materialData.descripcionMaterial, materialData.fechaPublicacion, materialData.temaId, materialData.claseId]);
        return {message: "Material creado con éxito", tareaId: result.insertId, tituloMaterial: materialData.tituloMaterial, fechaPublicacion: materialData.fechaPublicacion};
    }

    async getMaterialesPorClase(claseId) {
        const sql = `
            SELECT material_id, titulo_material, descripcion_material, fecha_publicacion, tema_id
            FROM materiales
            WHERE clase_id = ?
            ORDER BY fecha_publicacion DESC
        `;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve los materiales asociadas a la clase
    }

}

module.exports = new TareasService;