const bodyParser = require("body-parser");

async function peticionGetPorTipo(req, res) {
  try {
    const tipo = req.params.tipo;
    const [rows] = await req.db.query("SELECT * FROM animales WHERE tipo = ?", [
      tipo,
    ]);
    res.send(rows);
  } catch (error) {
    console.error("Error al hacer la consulta: ", error);
    res.status(500).json({ error: "Error al hacer la consulta" });
  }
}

async function peticionPutPorId(req, res) {
  try {
    const { nombre } = req.body;
    const [rows] = await req.db.query(
      "UPDATE animales SET nombre = ? WHERE id = ?",
      [nombre, req.params.id]
    );
    res.send(rows);
  } catch (e) {
    console.error("Error al hacer la consulta: ", error);
    res.status(500).json({ error: "Error al hacer la consulta" });
  }
}

async function peticionPost(req, res) {
  try {
    const { id, nombre, tipo, peso, edad } = req.body[0];
    const [rows] = await req.db.query(
      "INSERT INTO animales (nombre, tipo, peso, edad) VALUES (?, ?, ?, ?)",
      [nombre, tipo, peso, edad]
    );
    res.send(rows);
  } catch (error) {
    console.error("Error al hacer la consulta: ", error);
    res.status(500).json({ error: "Error al hacer la consulta" });
  }
}

async function peticionDeletePorID(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await req.db.query("DELETE FROM animales WHERE id = ?", [
      id,
    ]);
    res.send(rows);
  } catch (error) {
    console.error("Error al hacer la consulta: ", error);
    res.status(500).json({ error: "Error al hacer la consulta" });
  }
}

module.exports = {
  peticionGetPorTipo,
  peticionPutPorId,
  peticionPost,
  peticionDeletePorID,
};
