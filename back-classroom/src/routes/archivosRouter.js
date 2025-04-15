const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require('multer');
const path = require('path');
const archivoService = require("../services/ArchivoService");  // Instancia del servicio de archivos

// Configuración básica de multer
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal


// #01 Endpoint para subir un archivo 
router.post('/subir-archivo', auth, upload.single('file'), async (req, res) => {
  try {

    console.log("Antes");
    const user = req.userData; // Usuario autenticado desde el token
    console.log("UsuarioAutenticado: ", user);
    console.log("u_id   : ", user.usuario_id);

    const archivoData = req.body;

    archivoData.nombreOriginal = req.file.originalname; // Nombre original del archivo
    archivoData.fechaPublicacion = new Date(); // Fecha de creación del archivo
    archivoData.usuarioId = user.usuario_id; // ID del usuario autenticado

    const archivoGuardado = await archivoService.subirArchivo(archivoData, req.file);
    res.json({ mensaje: 'Archivo subido', archivoGuardado });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// #02 Endpoint para obtener los archivos asociados a una publicacion (Alumno o profesor)
router.post("/get-archivos", auth, async (req, res) => {
  try {
      const user = req.userData;  // Usuario autenticado desde el token
      let archivos;
      
      const publicacionData = req.body;

      archivos = await archivoService.getArchivosPorPublicacion(publicacionData);
      res.json(archivos);

  } catch (error) {
      res.status(500).json({ message: "Error al obtener los archivos relacionados a la publicacion", error: error.message });
  }
});

// #03 Endpoint para descargar archivos
router.get('/download/:classId/:year/:filename', auth, async (req, res) => {
  try {
    const { classId, year, filename } = req.params;

    console.log("Se intento descargar")

    const filePath = await archivoService.downloadArchivo(classId, year, filename);
    res.download(filePath, filename);
  } catch (error) {
    res.status(404).json({ message: "Archivo no encontrado" });
  }
});

module.exports = router;
