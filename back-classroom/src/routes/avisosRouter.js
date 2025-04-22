const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");  // Middleware de autenticación

const avisoService = require("../services/AvisoService");  // Instancia del servicio de clases

// #01 Endpoint para crear un nuevo aviso (SOLO MAESTROS)
router.post("/create", auth, async (req, res) => {
    try {
        console.log("Antes");
        const user = req.userData; // Usuario autenticado desde el token
        console.log("UsuarioAutenticado: ", user);
        console.log("u_id   : ", user.usuario_id);

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Acceso denegado. Solo los profesores pueden crear avisos." });
        }

        const avisoData = req.body;
        avisoData.fechaPublicacion = avisoData.fechaPublicacion || new Date(); // Asigna la fecha actual si no se proporciona

        const result = await avisoService.agregarAviso(avisoData);
        res.status(201).json(result);

    } catch (error) {
        console.error("Error al crear el aviso:", error);
        res.status(500).json({ message: "Error al crear el aviso", error: error.message });
    }
});


// #02 Endpoint para obtener los avisos asociados a una clase (Alumno o profesor)
router.post("/get-avisos", auth, async (req, res) => {
    try {
        const user = req.userData;  // Usuario autenticado desde el token
        let avisos;

        avisos = await avisoService.getAvisosPorClase(req.body.claseId);
        res.json(avisos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las clases", error: error.message });
    }
});

// #03 Endpoint para obtener un aviso por su ID
router.post("/get-aviso-by-id", auth, async (req, res) => { 
    try {
        const avisoId = req.body.avisoId;

        const aviso = await avisoService.getAvisoById(avisoId);
        res.json(aviso);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el aviso", error: error.message });
    }
});


module.exports = router;
