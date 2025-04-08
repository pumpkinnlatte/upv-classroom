const db = require("../data-access/db"); //Acceso a la base de datos

class ClaseService {

    //CLASES

    async crearClase(claseData) {
        const sql = "INSERT INTO clases (nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre, profesor_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [claseData.nombre, claseData.descripcion, claseData.codigoGrupo, claseData.carrera, claseData.cuatrimestre, claseData.profesorId]);
        return {message: "Clase creada con éxito", claseId: result.insertId, claseNombre: claseData.nombre};
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

    async getClaseById(claseId) {  //Obtener una clase por su ID
        const sql = `
            SELECT clase_id, nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre
            FROM clases WHERE clase_id = ?`;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows[0]; // Devuelve solo la primera fila
    }

    //ALUMNOS

    async agregarAlumno(claseId, usuarioId){
        const sql = "INSERT INTO alumnos_clases (clase_id, usuario_id) VALUES (?, ?)";
        const result = await db.query(sql, [claseId, usuarioId]);
        return {message: "Alumno agregado con éxito", usuarioId: usuarioId, claseId: claseId};
    }

    async getAlumnosByClase(claseId) {  //Obtener Alumnos asociados a una clase
        const sql = `
            SELECT u.usuario_id, u.nombre, u.matricula
            FROM usuarios u
            JOIN alumnos_clases ac ON u.usuario_id = ac.usuario_id
            WHERE ac.clase_id = ?`;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve solo las filas
    }

    async crearTema(claseId, temaData) {
        const sql = "INSERT INTO temas (nombre_tema, descripcion_tema, clase_id) VALUES (?, ?, ?)";
        const result = await db.query(sql, [temaData.nombreTema, temaData.descripcionTema, claseId]);
        return {message: "Tema creado con éxito", temaId: result.insertId, temaNombre: temaData.nombreTema, claseId: claseId};
    }

}

module.exports = new ClaseService;