const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");  // Middleware de autenticación

const materialService = require("../services/MaterialService");  // Instancia del servicio de clases

// #01 Endpoint para crear un nuevo material (SOLO MAESTROS)
router.post("/create", auth, async (req, res) => {
    try {
        console.log("Antes");
        const user = req.userData; // Usuario autenticado desde el token
        console.log("UsuarioAutenticado: ", user);
        console.log("u_id   : ", user.usuario_id);

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Acceso denegado. Solo los profesores pueden crear materiales." });
        }

        const materialData = req.body;
        materialData.fechaPublicacion = materialData.fechaPublicacion || new Date(); // Asigna la fecha actual si no se proporciona

        const result = await materialService.crearMaterial(materialData);
        res.status(201).json(result);

    } catch (error) {
        console.error("Error al crear el material:", error);
        res.status(500).json({ message: "Error al crear el material", error: error.message });
    }
});


// #02 Endpoint para obtener los materiales asociados a una clase (Alumno o profesor)
router.post("/get-materiales", auth, async (req, res) => {
    try {
        const user = req.userData;  // Usuario autenticado desde el token
        let avisos;

        avisos = await materialService.getMaterialesPorClase(req.body.claseId);
        res.json(avisos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener los materiales asociados a la clase", error: error.message });
    }
});

// #03 Endpoint para obtener un material por su ID
router.post("/get-material-by-id", auth, async (req, res) => { 
    try {
        const materialId = req.body.materialId;

        const material = await materialService.getMaterialById(materialId);
        res.json(material);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener el material", error: error.message });
    }
});



module.exports = router;
