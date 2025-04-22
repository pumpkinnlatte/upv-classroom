const db = require("../data-access/db"); //Acceso a la base de datos

class TareasService {

    //Materiales
    async crearMaterial(materialData) {
        const sql = "INSERT INTO materiales (titulo_material, descripcion_material, fecha_publicacion, has_file, tema_id, clase_id ) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [materialData.tituloMaterial, materialData.descripcionMaterial, materialData.fechaPublicacion, materialData.hasFile, materialData.temaId, materialData.claseId]);
        return {message: "Material creado con éxito", materialId: result[0].insertId, materialData: materialData.tituloMaterial, fechaPublicacion: materialData.fechaPublicacion};
    }

    async getMaterialesPorClase(claseId) {
        const sql = `
            SELECT material_id, titulo_material, descripcion_material, fecha_publicacion, tema_id, has_file
            FROM materiales
            WHERE clase_id = ?
            ORDER BY fecha_publicacion DESC
        `;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve los materiales asociadas a la clase
    }

    async getMaterialById(materialId) {
        const sql = `
            SELECT material_id, titulo_material, descripcion_material, fecha_publicacion, tema_id, has_file
            FROM materiales
            WHERE material_id = ?
        `;
        const [rows] = await db.query(sql, [materialId]); // Extrae solo las filas
        return rows[0]; // Devuelve el material asociado al ID
    }

}

module.exports = new TareasService;