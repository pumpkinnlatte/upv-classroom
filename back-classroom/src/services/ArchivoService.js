const db = require("../data-access/db");
const {DateTime} = require("luxon");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Convertimos las funciones de fs a promesas para usar async/await
const accessAsync = promisify(fs.access);
const mkdirAsync = promisify(fs.mkdir);
const renameAsync = promisify(fs.rename);
const unlinkAsync = promisify(fs.unlink);

class ArchivoService {

    async existeCrear(rutaEvaluada) {
        try {
            await mkdirAsync(rutaEvaluada, { recursive: true });
            return true;
        } catch (err) {
            console.error(`Error al crear la carpeta ${rutaEvaluada}:`, err);
            throw err;
        }
    }

    async deleteTempFile(filePath) {
        try {
            // Verificar si el archivo existe
            if (fs.existsSync(filePath)) {
                await unlinkAsync(filePath);
                console.log(`Archivo temporal eliminado: ${filePath}`);
            } else {
                console.log(`Archivo temporal no encontrado: ${filePath}`);
            }
        } catch (err) {
            console.error(`Error al limpiar archivo temporal: ${err}`);
        }
    }

     /*async asociarEntregaArchivo(asociadoData) {
        const sql = "INSERT INTO archivos_entregas (archivo_id, entrega_id) VALUES (?, ?)";
        const result = await db.query(sql, [asociadoData.archivoId, asociadoData.entregaId]);
        return {message: "Archivo asociado a la entrega con éxito", archivoEntregaId: result.insertId};
    }*/


    async subirArchivo(archivoData, file) {
        try {
            const fecha = new Date(archivoData.fechaPublicacion); 
            const storagePath = "storage/"; // Ruta base de almacenamiento
            
            // Estructura de carpetas: storage/clase_id/año/
            const claseFolder = `${archivoData.claseId}`;
            const yearFolder = `${fecha.getFullYear()}`;
            
            // Construimos la ruta completa
            const rutaClase = path.join(storagePath, claseFolder);
            const rutaFinal = path.join(rutaClase, yearFolder);
            
    
            await this.existeCrear(rutaClase);
            await this.existeCrear(rutaFinal);
            
    
            const nombreUnico = Date.now() + '-' + file.originalname;
            const rutaArchivo = path.join(rutaFinal, nombreUnico);
            
            // Movemos el archivo temporal a su ubicación final
            await renameAsync(file.path, rutaArchivo);

            // Eliminar archivos temporales después de moverlos
            this.deleteTempFile(file.path);

            archivoData.nombreStorage = nombreUnico; // Guardamos el nombre único en el objeto de datos
            let dbResponse = await this.sendToTablaArchivo(archivoData); // Guardamos la informacionen la base de datos

            console.log(dbResponse);

            archivoData.archivoId = dbResponse.id; // Obtenemos el ID del archivo insertado
            
            let relacionResponse = await this.sendToTablaRelacion(archivoData); // Guardamos la relacion en la base de datos

            console.log("Datos Archivo:", archivoData);
             
            // Retornamos la ruta relativa del archivo guardado
            return {ruta: path.join(claseFolder, yearFolder, nombreUnico), db_response: dbResponse, relacionResponse: relacionResponse};
            
        } catch (error) {
            console.error('Error al subir archivo:', error);
            throw new Error('No se pudo guardar el archivo');
        }
    }

    async getArchivosPorPublicacion(publicacionData) {
        try {
            const sql = `
                SELECT archivos.*
                FROM archivos
                INNER JOIN archivos_publicaciones
                ON archivos.archivo_id = archivos_publicaciones.archivo_id
                WHERE archivos_publicaciones.publicacion_id = ?
                AND archivos_publicaciones.tipo_publicacion = ?
            `;
            const params = [publicacionData.publicacionId, publicacionData.tipoPublicacion];
            const [rows] = await db.query(sql, params);
    
            if (rows.length > 0) {
                return rows; 
            } else {
                return []; // Retorna un array vacío si no se encuentran archivos
            }
        } catch (error) {
            console.error('Error al obtener archivos por publicación:', error);
            throw new Error('No se pudieron obtener los archivos de la publicación');
        }
    }
    
    async sendToTablaArchivo(archivoData) {
        try {
            const sql = `INSERT INTO archivos (nombre_original, fecha_creacion, nombre_en_storage, usuario_id) VALUES (?, ?, ?, ?)`;
            const params = [archivoData.nombreOriginal, archivoData.fechaPublicacion, archivoData.nombreStorage, archivoData.usuarioId];
            const [result] = await db.query(sql, params);
    
            console.log("Resultado de la insercion:", result);
    
            if (result && result.insertId) {
                return { message: "Informacion del archivo guardada con exito", id: result.insertId };
            } else {
                throw new Error("No se pudo obtener el ID del archivo insertado");
            }
        } catch (error) {
            console.error("Error al guardar en la base de datos:", error);
            throw new Error("No se pudo guardar la informacion del archivo en la base de datos");
        }
    }

    async sendToTablaRelacion(archivoData) {
        try {
            const sql = `INSERT INTO archivos_publicaciones (archivo_id, publicacion_id, tipo_publicacion) VALUES (?, ?, ?)`;
            const params = [archivoData.archivoId, archivoData.publicacionId, archivoData.tipoPublicacion];
            const result = await db.query(sql, params);
            return {message: "Datos del archivo relacionados con exito"};
        } catch (error) {
            console.error('Error al guardar en la base de datos:', error);
            throw new Error('No se pudo guardar la informacion del archivo en la base de datos');
        }
    }

    async downloadArchivo(classId, year, filename) {
        try {
            const filePath = path.resolve(__dirname, '..', '..', 'storage', classId, year, filename);
            // Verificar si el archivo existe
            await accessAsync(filePath, fs.constants.F_OK);
            return filePath;
        } catch (error) {
            console.error('Error al acceder al archivo:', error);
            throw new Error('Archivo no encontrado');
        }
    }
    
}

module.exports = new ArchivoService();