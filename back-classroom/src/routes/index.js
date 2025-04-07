const express = require("express");

const cuentasRouter = require("./cuentasRouter"); // Rutas para acciones relacionadas con cuentas de usuario

const clasesRouter = require("./clasesRouter"); // Rutas para acciones relacionadas con clases

const avisosRouter = require("./avisosRouter"); // Rutas para acciones relacionadas con avisos

const tareasRouter = require("./tareasRouter"); // Rutas para acciones relacionadas con las tareas

const materialesRouter = require("./materialRouter"); // Rutas para acciones relacionadas con los materiales

const archivosRouter = require("./archivosRouter"); // Rutas para acciones relacionadas con los archivos


/**
 * Función principal para registrar las rutas de la aplicación
 * @param {*} app Express App
 */
function routerApi(app) {
    const router = express.Router();
    app.use("/api/v1", router);  // Ruta base para la API

    router.use("/account", cuentasRouter);  //      #1 Rutas para acciones relacionadas con cuentas de usuario

    router.use("/class", clasesRouter); //          #2 Rutas para acciones relacionadas con clases

    router.use("/announcements", avisosRouter); //  #3 Rutas para acciones relacionadas con los avisos

    router.use("/tareas", tareasRouter); //         #4 Rutas para acciones relacionadas con las tareas

    router.use("/materiales", materialesRouter); // #5 Rutas para acciones relacionadas con los materiales

    router.use("/archivos", archivosRouter); //     #6 Rutas para acciones relacionadas con los archivos
}

module.exports = routerApi;
