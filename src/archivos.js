const fs = require("node:fs/promises");

async function leerJSON(ruta) {
  const texto = await fs.readFile(ruta, "utf8");
  return JSON.parse(texto);
}

module.exports = { leerJSON };
