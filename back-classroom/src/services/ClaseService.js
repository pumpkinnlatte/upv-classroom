const db = require("../data-access/db"); //Acceso a la base de datos

class ClaseService {

    async crearClase(claseData) {
        const sql = "INSERT INTO clases (nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre, profesor_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [claseData.nombre, claseData.descripcion, claseData.codigoGrupo, claseData.carrera, claseData.cuatrimestre, claseData.profesorId]);
        return {message: "Clase creada con éxito", claseId: result.insertId, claseNombre: claseData.nombre};
    }

    async agregarAlumno(claseId, usuarioId){
        const sql = "INSERT INTO alumnos_clases (clase_id, usuario_id) VALUES (?, ?)";
        const result = await db.query(sql, [claseId, usuarioId]);
        return {message: "Alumno agregado con éxito", usuarioId: usuarioId, claseId: claseId};
    }

    async getClasesByAlumno(alumnoId) {  //Obtener Clases asociadas a un alumno
        const sql = `
            SELECT c.clase_id, c.nombre_clase, c.descripcion_clase, c.codigo_grupo, c.carrera, c.cuatrimestre
            FROM clases c
            JOIN alumnos_clases ac ON c.clase_id = ac.clase_id
            WHERE ac.usuario_id = ?`;
        const [rows] = await db.query(sql, [alumnoId]); // Extrae solo las filas
        return rows; // Devuelve solo las filas
    }

    async getClasesByProfesor(profesorID) {  //Obtener Clases asociadas a un profesor
        const sql = `
            SELECT clase_id, nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre
            FROM clases WHERE profesor_id = ?`;
        const [rows] = await db.query(sql, [profesorID]); // Extrae solo las filas
        return rows; // Devuelve solo las filas
    }

}

module.exports = new ClaseService;