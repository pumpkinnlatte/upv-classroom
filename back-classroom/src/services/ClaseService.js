const db = require("../data-access/db"); //Acceso a la base de datos

class ClaseService {

    async isCodigoGrupoUnique(codigoGrupo) {
        const sql = "SELECT COUNT(*) as count FROM clases WHERE codigo_grupo = ?";
        const [result] = await db.query(sql, [codigoGrupo]);
        return result[0].count === 0;
    }

    async generarCodigoGrupoUnico() {
        let codigoGrupo;
        let esUnico = false;
        
        const generarCodigo = () => {
            const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
            const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numeros = '0123456789';
            let codigo = '';
    
            // Asegura al menos 2 números
            for (let i = 0; i < 2; i++) {
                codigo += numeros[Math.floor(Math.random() * numeros.length)];
            }
    
            // Asegura al menos 2 mayúsculas
            for (let i = 0; i < 2; i++) {
                codigo += letrasMayusculas[Math.floor(Math.random() * letrasMayusculas.length)];
            }
    
            // Asegura al menos 3 minúsculas
            for (let i = 0; i < 3; i++) {
                codigo += letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)];
            }
    
            // Mezcla aleatoriamente el código
            return codigo.split('').sort(() => Math.random() - 0.5).join('');
        };
        
        while (!esUnico) {
            codigoGrupo = generarCodigo();
            esUnico = await this.isCodigoGrupoUnique(codigoGrupo);
        }
        
        return codigoGrupo;
    }


    //CLASES
    async crearClase(claseData) {
        const codigoGrupo = await this.generarCodigoGrupoUnico();

        const sql = "INSERT INTO clases (nombre_clase, descripcion_clase, codigo_grupo, carrera, cuatrimestre, profesor_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(sql, [claseData.nombre, claseData.descripcion, codigoGrupo, claseData.carrera, claseData.cuatrimestre, claseData.profesorId]);
        return {message: "Clase creada con éxito", claseId: result[0].insertId, claseNombre: claseData.nombre};
    }

    async getClasesByAlumno(alumnoId) {
        //Obtener Clases asociadas a un alumno con el nombre del profesor
        const sql = `
          SELECT c.clase_id, c.nombre_clase, c.descripcion_clase, c.codigo_grupo, c.carrera, c.cuatrimestre, c.profesor_id, u.nombre AS nombre_profesor
          FROM clases c
          JOIN alumnos_clases ac ON c.clase_id = ac.clase_id
          JOIN usuarios u ON c.profesor_id = u.usuario_id
          WHERE ac.usuario_id = ?`;
        const [rows] = await db.query(sql, [alumnoId]); // Extrae solo las filas
        return rows; // Devuelve las filas con el nombre del profesor
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
            SELECT c.clase_id, c.nombre_clase, c.descripcion_clase, c.codigo_grupo, 
                   c.carrera, c.cuatrimestre, c.profesor_id, u.nombre AS nombre_profesor
            FROM clases c
            JOIN usuarios u ON c.profesor_id = u.usuario_id
            WHERE c.clase_id = ?`;
        const [rows] = await db.query(sql, [claseId]);
        return rows[0];
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

    async getAlumnosNoInscritos(claseId) {  //Obtener Alumnos no inscritos en una clase
        const sql = `
            SELECT u.usuario_id, u.nombre, u.matricula
            FROM usuarios u
            LEFT JOIN alumnos_clases ac ON u.usuario_id = ac.usuario_id AND ac.clase_id = ?
            WHERE ac.usuario_id IS NULL AND u.rol = 'alumno'`;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve solo las filas
    }

    async joinByCode(classCode, usuarioId) {
        //Unirse a una clase por su código
        const sql = `
            INSERT INTO alumnos_clases (usuario_id, clase_id)
            SELECT ?, clase_id FROM clases WHERE codigo_grupo = ?`;
        const result = await db.query(sql, [usuarioId, classCode]);

        console.log(result); // Para depuración

        if (result.affectedRows === 0) {
            return {message: "Código de clase inválido"};
        } else {

            const sql2 = `SELECT clase_id FROM clases WHERE codigo_grupo = ?`;
            const [rows] = await db.query(sql2, [classCode]); // Extrae solo las filas

            return {message: "Estudiante se ha unido a la clase con éxito", codigo: classCode, claseId: rows[0].clase_id};
        }
    }

    //TEMAS

    async crearTema(claseId, temaData) {
        const sql = "INSERT INTO temas (nombre_tema, descripcion_tema, clase_id) VALUES (?, ?, ?)";
        const result = await db.query(sql, [temaData.nombreTema, temaData.descripcionTema, claseId]);
        return {message: "Tema creado con éxito", temaId: result.insertId, temaNombre: temaData.nombreTema, claseId: claseId};
    }

    async getTemasByClase(claseId) {  //Obtener Temas asociados a una clase
        const sql = `
            SELECT tema_id, nombre_tema, descripcion_tema
            FROM temas WHERE clase_id = ?`;
        const [rows] = await db.query(sql, [claseId]); // Extrae solo las filas
        return rows; // Devuelve solo las filas
    }

}

module.exports = new ClaseService;