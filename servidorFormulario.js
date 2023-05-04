const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const app = express();

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

// Configura la conexión a la base de datos
const connectionPromise = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "prueba",
});

// Crea una ruta para la formulario
app.get("/formulario", (req, res) => {
  res.send(`
    <form method="POST" action="/consulta">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre">
      <button type="submit">Enviar</button>
    </form>
  `);
});

// Crea una ruta para la consulta
app.post("/consulta", async (req, res) => {
  const nombre = req.body.nombre;
  console.log(req.body.nombre);

  try {
    // Obtiene la conexión a la base de datos
    const connection = await connectionPromise;

    // Crea la consulta SQL con el nombre del formulario
    const sql = `SELECT * FROM productos WHERE nombre = '${nombre}'`;

    // Ejecuta la consulta en la base de datos
    const [results, fields] = await connection.execute(sql);

    // Muestra los resultados al usuario
    res.send(`Los resultados son: ${JSON.stringify(results)}`);
  } catch (error) {
    console.error(error);
    res.send("Ha ocurrido un error");
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
