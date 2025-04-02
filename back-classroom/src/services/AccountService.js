const db = require("../data-access/db"); //Acceso a la base de datos

const bcrypt = require("bcrypt"); //De momento no se usa
const jwt = require("jsonwebtoken");
const { ulid } = require("ulid");
const {DateTime} = require("luxon"); //Manipular fechas y horas

const config = require("../config.json").accountServiceConfig;
const { use } = require("../routes/cuentasRouter");

class AccountService {
    constructor() {  //Parametros para los tokens
        this.accessTokenSecret = config.accessTokenSecret;
        this.accessTokenExpirationSec = config.accessTokenExpirationSec;
        this.refreshTokenExpirationDays = config.refreshTokenExpirationDays;
        this.passwordSaltWorkFactor = config.passwordSaltWorkFactor;
    }

    async validarCredenciales(identifier, password) {
        const sql = "SELECT usuario_id, password FROM usuarios WHERE matricula = ? or email = ?";
        const [[user]] = await db.query(sql, [identifier, identifier]);
   
        if(password === user.password) {
            return user.usuario_id;
        }

        return 0;
    }

    async getUserData(identifier, isUserId = false) {
        const sql = "SELECT usuario_id, email, matricula, nombre, rol AS tipoUsuario FROM usuarios WHERE " + (isUserId ? "usuario_id" : "username") + " = ?";
        const [[user]] = await db.query(sql, [identifier]);
        return user || null;
    }

    async crearAccessToken(userId) {
        const userData = await this.getUserData(userId, true);
        if (!userData) return null;
        return jwt.sign({
            userId: userData.usuario_id,
            tipoUsuario: userData.tipoUsuario,
            exp: Math.floor(DateTime.now().plus({ seconds: this.accessTokenExpirationSec }).toSeconds())
        }, this.accessTokenSecret);
    }

    async crearRefreshToken(userId) {
        const refreshToken = ulid();
        await db.execute(
            "INSERT INTO refresh_tokens (refresh_token, usuario_id, fecha_generado, fecha_caduca) VALUES (?, ?, ?, ?)",
            [refreshToken, userId, new Date(), DateTime.now().plus({ days: this.refreshTokenExpirationDays }).toJSDate()]
        );
        return refreshToken;
    }

    async refreshAccessToken(refreshToken) {
        const [[storedToken]] = await db.query("SELECT usuario_id, fecha_caduca FROM refresh_tokens WHERE refresh_token = ? AND activo = 1", [refreshToken]);
        if (!storedToken || new Date() > storedToken.fecha_caduca) {
            await this.invalidarRefreshToken(refreshToken);
            return null;
        }
        return this.crearAccessToken(storedToken.usuario_id);
    }

    async invalidarRefreshToken(refreshToken) {
        await db.execute("UPDATE refresh_tokens SET activo = 0 WHERE refresh_token = ?", [refreshToken]);
    }

    async getUserDataFromAccessToken(accessToken) {
        try {
            const { userId } = jwt.verify(accessToken, this.accessTokenSecret);
            return this.getUserData(userId, true);
        } catch {
            return null;
        }
    }
}

module.exports = AccountService;
