const express = require("express")
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express ejecutandose");
});

app.listen(PORT, () => {
    console.log("Aplicación ejecutandose en el puerto: ", PORT);
});
