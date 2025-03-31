const express = require("express");

const cuentasRouter = require("./cuentasRouter"); // Rutas para acciones relacionadas con cuentas de usuario


/**
 * Función principal para registrar las rutas de la aplicación
 * @param {*} app Express App
 */
function routerApi(app) {
    const router = express.Router();
    app.use("/api/v1", router);  // Ruta base para la API

    router.use("/account", cuentasRouter);  // #1 Rutas para acciones relacionadas con cuentas de usuario
}

module.exports = routerApi;
