const express = require("express")
const cors = require("cors");

const routerApi = require("./routes"); // Importar las rutas de la aplicación

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Express ejecutandose");
});

app.get("/hola", (req, res) => {
    res.send("hola");
});

routerApi(app);

app.listen(PORT, () => {
    console.log("Aplicación ejecutandose en el puerto: ", PORT);
});
