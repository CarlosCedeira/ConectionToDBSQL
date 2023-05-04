const express = require("express");
const bodyParser = require("body-parser");
const peticion = require("./funcionesPeticion.js");
const conexion = require("./middleware.js");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Agregar middleware para crear la conexión a la base de datos en cada solicitud
app.use(conexion);

// Distintas peticiones al servidor
app.get("/:tipo", peticion.peticionGetPorTipo);

app.put("/:id", peticion.peticionPutPorId);

app.post("/", peticion.peticionPost);

app.delete("/:id", peticion.peticionDeletePorID);

const server = app.listen(3000, () => {
  console.log("Server started on port 3000!");
});

server.on("close", async () => {
  try {
    await req.db.end();
    console.log("Disconnected from database!");
  } catch (error) {
    console.error("Error al cerrar la conexión a la base de datos: ", error);
  }
});
