const express = require("express");
const router = express.Router();
const ClaseService = require("../services/ClaseService");  // Importa correctamente el servicio
const auth = require("../middlewares/auth");  // Middleware de autenticación

const claseService = require("../services/ClaseService");  // Instancia del servicio de clases

// #01 Endpoint para crear una nueva clase (SOLO MAESTROS)
router.post("/create", auth, async (req, res) => {
    try {
        console.log("Antes")
        const user = req.userData;  // Usuario autenticado desde el token
        console.log("UsuarioAutenticado: ", user);
        console.log("u_id   : ", user.usuario_id);

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Acceso denegado. Solo los profesores pueden crear clases." });
        }

        const claseData = req.body;
        claseData.profesorId = user.usuario_id;  // Asigna el ID del profesor autenticado
        
        const result = await claseService.crearClase(claseData);
        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ message: "Error al crear la clase", error: error.message });
    }
});

// #02 Endpoint para obtener las clases de un usuario (Alumno o profesor)
router.post("/get-classes", auth, async (req, res) => {
    try {
        const user = req.userData;  // Usuario autenticado desde el token
        let clases;

        console.log("claseId: ", req.body.claseId);

        if (!req.body.claseId) {
            if (user.tipoUsuario === "profesor") {
                clases = await claseService.getClasesByProfesor(user.usuario_id);
                // Mapear cada clase para añadir el nombre_profesor
                clases = clases.map(clase => ({
                    ...clase,
                    nombre_profesor: user.nombre
                }));
            } else if (user.tipoUsuario === "alumno") {
                clases = await claseService.getClasesByAlumno(user.usuario_id);
            } else {
                return res.status(403).json({ message: "Rol no válido" });
            }
        } else {
            clases = await claseService.getClaseById(req.body.claseId);
        }

        res.json(clases);

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las clases", error: error.message });
    }
});

// #03 Endpoint para ingresar a una clase (SOLO ALUMNOS)
router.post("/join-by-code", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        if (user.tipoUsuario !== "alumno") {
            return res.status(403).json({ message: "Un profesor no puede ser alumno de una clase" });
        } 

        let codigoClase = req.body.codigoClase;  // Código de la clase a la que se quiere unir

        const result = await claseService.joinByCode(codigoClase, user.usuario_id);
        res.status(201).json(result);


    } catch (error){
        res.status(500).json({ message: "Error al ingresar a la clase", error: error.message });
    }

});

// #04 Endpoint para anadir un alumno (SOLO PROFESORES)
router.post("/add-alumno", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        const data = req.body;  // Datos del alumno a agregar

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Un alumno no puede agregar un usuario a una clase" });
        } 

        const result = await claseService.agregarAlumno(data.claseId, data.usuarioId);
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({ message: "Error al agregar el alumno", error: error.message });
    }

});


// #05 Endpoint para obtener todos los alumnos asociados a una clase
router.post("/get-alumnos", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        const data = req.body;  // Datos de la clase

        const result = await claseService.getAlumnosByClase(data.claseId);
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({ message: "Error al obtener alumnos inscritos", error: error.message });
    }

});


// #05 Endpoint para obtener todos los alumnos no inscritos a una clase
router.post("/get-alumnos-no-inscritos", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        const data = req.body;  // Datos de la clase

        const result = await claseService.getAlumnosNoInscritos(data.claseId);
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({ message: "Error al obtener alumnos inscritos", error: error.message });
    }

});


// #07 Endpoint para crear un tema en una clase (SOLO PROFESORES)
router.post("/create-topic", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        const temaData = req.body;  // Datos del tema

        if (user.tipoUsuario !== "profesor") {
            return res.status(403).json({ message: "Un alumno no puede crear un tema en la clase" });
        } 

        const result = await claseService.crearTema(temaData.claseId, temaData);
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({ message: "Error al obtener alumnos inscritos", error: error.message });
    }

});

// #08 Endpoint para obtener los temas de una clase
router.post("/get-topics", auth, async (req, res) => {
    try{
        const user = req.userData;  // Usuario autenticado desde el token

        const data = req.body;  // Datos de la clase

        const result = await claseService.getTemasByClase(data.claseId);
        res.status(201).json(result);

    } catch (error){
        res.status(500).json({ message: "Error al obtener los temas de la clase", error: error.message });
    }

});

module.exports = router;
