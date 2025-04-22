const express = require("express");
const router = express.Router();

const AccountService = require("../services/AccountService"); //Servicio para manejar cuentas
const auth = require("../middlewares/auth"); //Middleware para autenticar al usuario

//Servicio para manejar cuentas
const accountService = new AccountService();

// #01 Endpoint de login, para obtener el access token (JWT) y el refresh token
router.post("/login", async (req, res) => {
    
    // se obtienen el username y password del request object, y se validan
    const {username, password} = req.body;
    if (!username?.trim() || !password?.trim()) {
        res.status(400).json({message: "Se debe enviar el username y password"});
        return;
    }

    // Validación de las credenciales.
    const userId = await accountService.validarCredenciales(username, password);
    if (!userId) {
        res.status(401).json({message: "Credenciales Invalidas"});
        return;
    }

    // Generación de access token y el refresh token
    const accessToken = await accountService.crearAccessToken(userId);
    const refreshToken = await accountService.crearRefreshToken(userId);
    
    res.json({accessToken, refreshToken});
});



// #02 Endpoint para obtener un nuevo access token usando el refresh token
router.post("/refresh-token", async (req, res) => {
    
    // Obtención del refresh token del request object
    const { refreshToken } = req.body;
    if (!refreshToken) {
        res.status(400).json({message: "Debe proporcionar el refresh token"});
        return;
    }

    // Se genera el nuevo access token
    const accessToken = await accountService.refreshAccessToken(refreshToken);
    if (!accessToken) {  
        res.status(401).json({message: "Refresh Token no válido o expirado"});
        return;
    }

    res.json({accessToken});
});

// #03 Endpoint para cerrar sesión (invalidar el refresh token)
router.post("/logout", auth, async (req, res) => {
    try {

        const user = req.userData;  // Usuario autenticado desde el token
        if (!user) {
            return res.status(400).json({ message: "Access token no válido o expirado" });
        }

        const refreshToken = req.body.refreshToken;
        
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token no proporcionado" });
        }

        await accountService.invalidarRefreshToken(refreshToken);

        res.json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
        console.error("Error en logout:", error);
        res.status(500).json({ message: "Error al cerrar la sesión" });
    }
});

// #04 Endpoint para obtener la información del usuario
router.post("/user-info", auth, (req, res) => {
    res.json(req.userData);
});


module.exports = router;

