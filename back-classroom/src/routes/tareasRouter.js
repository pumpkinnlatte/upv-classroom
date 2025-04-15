const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");  // Middleware de autenticación

const tareaService = require("../services/TareaService");  // Instancia del servicio de clases

// #01 Endpoint para crear una nueva tarea (SOLO MAESTROS)
router.post("/create", auth, async (req, res) => {
    try {
        console.log("Antes");
        const user = req.userData; // Usuario autenticado desde el token
        console.log("UsuarioAutenticado: ", user);
        console.log("u_id   : ", user.usuario_id);

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Acceso denegado. Solo los profesores pueden crear tareas." });
        }

        const tareaData = req.body;
        tareaData.fechaPublicacion = tareaData.fechaPublicacion || new Date(); // Asigna la fecha actual si no se proporciona

        const result = await tareaService.crearTarea(tareaData);
        res.status(201).json(result);

    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ message: "Error al crear la tarea", error: error.message });
    }
});


// #02 Endpoint para obtener las tareas asociadas a una clase (Alumno o profesor)
router.post("/get-tareas", auth, async (req, res) => {
    try {
        const user = req.userData;  // Usuario autenticado desde el token
        let avisos;

        avisos = await tareaService.getTareasPorClase(req.body.claseId);
        res.json(avisos);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas asociadas a la clase", error: error.message });
    }
});

// #03 Endpoint para obtener una tarea por su ID (Alumno o profesor)
router.post("/get-tarea-by-id", auth, async (req, res) => {
    try {
        const user = req.userData;  // Usuario autenticado desde el token
        let tarea;

        tarea = await tareaService.getTareaPorId(req.body.tareaId);
        res.json(tarea);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea", error: error.message });
    }
});

// #04 Endpoint para entregar una tarea (SOLO MAESTROS)
router.post("/entregar-tarea", auth, async (req, res) => {
    try {
        const user = req.userData; // Usuario autenticado desde el token

        if (user.tipoUsuario !== "alumno") {
            return res.status(403).json({ message: "Acceso denegado. Solo los alumnos pueden entregar tareas." });
        }

        const entregaData = req.body;
        entregaData.fechaEntrega = entregaData.fechaEntrega || new Date(); // Asigna la fecha actual si no se proporciona

        const result = await tareaService.entregarTarea(entregaData);

        if(result.entregaId) {
            // Si se proporciona un archivo, asociarlo a la entrega
            if (entregaData.archivoId) {

                const asociadoData = {
                    archivoId: entregaData.archivoId,
                    entregaId: result.entregaId
                };

                await tareaService.asociarEntregaArchivo(asociadoData);
            }
        }

        res.status(201).json(result);

    } catch (error) {
        console.error("Error al entregar la tarea:", error);
        res.status(500).json({ message: "Error al entregar la tarea", error: error.message });
    }
});

// #05 Endpoint para calificar Tareas (SOLO MAESTROS)
router.post("/calificar-tarea", auth, async (req, res) => {

    try {
        const user = req.userData; // Usuario autenticado desde el token

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Acceso denegado. Solo los profesores pueden calificar tareas." });
        }

        const calData = req.body;
        calData.estado = "calificado"; // Asigna el estado por defecto 

    
        const result = await tareaService.calificarEntrega(calData);
        res.status(200).json(result);

    } catch (error) {
        console.error("Error al calificar la tarea:", error);
        res.status(500).json({ message: "Error al calificar la tarea", error: error.message });
    }

});

module.exports = router;
