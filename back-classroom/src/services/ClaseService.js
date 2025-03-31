const db = require("../data-access/db"); //Acceso a la base de datos

class ClaseService {

    async crearClase({ nombre, descripcion, codigoGrupo, carrera, cuatrimestre, profesorId }) {
        const sql = "INSERT INTO clases (nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre, profesor_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [nombre, descripcion, codigoGrupo, carrera, cuatrimestre, profesorId]);

        return { id: result.insertId, nombre, descripcion, codigoGrupo, carrera, cuatrimestre };
    }

    async getClasesByAlumno(alumnoId) {  //Obtener Clases asociadas a un alumno
        const sql = `
            SELECT c.clase_id, c.nombre_clase, c.descripcion_clase, c.codigo_grupo, c.carrera, c.cuatrimestre
            FROM clases c
            JOIN alumnos_clases ac ON c.clase_id = ac.clase_id
            WHERE ac.usuario_id = ?`;
        return await db.query(sql, [alumnoId]);
    }

    async getClasesByProfesor(profesorID) {  //Obtener Clases asociadas a un profesor
        const sql = `
            SELECT clase_id, nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre
            FROM clases WHERE profesor_id = ?`;
        return await db.query(sql, [profesorID]);
    }

}

module.exports = new ClaseService();