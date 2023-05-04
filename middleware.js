const mysql = require("mysql2/promise");

async function conexion(req, res, next) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    });
    req.db = connection;
    next();
  } catch (error) {
    console.error("Error al conectar a la base de datos: ", error);
    res.status(500).json({ error: "Error al conectar a la base de datos" });
  }
}

module.exports = conexion;
/*Esto es una prueba*/
