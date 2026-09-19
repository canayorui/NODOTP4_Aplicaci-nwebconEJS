const express = require("express");
const path = require("node:path");
const { leerJSON } = require("./archivos");
const layouts = require("express-ejs-layouts");

async function main() {
  try {
    const ruta = path.join(__dirname, "../datos/mascotas.json");
    const mascotas = await leerJSON(ruta);

    const app = express();
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(layouts);
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../views"));
    app.set("layout", "layouts/main");

    // Inicio
    app.get("/", (req, res) => {
      res.status(200).render("inicio", { titulo: "Inicio", mascotas });
    });

    // Listado
    app.get("/mascotas", (req, res) => {
      res.status(200).render("mascotas/lista", { titulo: "Catálogo", mascotas });
    });

    // Formulario nueva
    app.get("/mascotas/nueva", (req, res) => {
      res.status(200).render("mascotas/nueva", { titulo: "Nueva mascota", error: null, valores: {} });
    });

    // Detalle
    app.get("/mascotas/:id", (req, res) => {
      const id = Number(req.params.id);
      const mascota = mascotas.find(m => m.id === id);
      if (mascota) {
        res.status(200).render("mascotas/detalle", { titulo: mascota.nombre, mascota });
      } else {
        res.status(404).render("no-encontrado", { titulo: "No encontrado" });
      }
    });

    // Procesar formulario
    app.post("/mascotas", (req, res) => {
      const { nombre, especie, edad, estado, descripcion } = req.body;
      const edadNum = Number(edad);

      if (!nombre || !especie || !descripcion || isNaN(edadNum) || edadNum < 0 || !estado) {
        return res.status(400).render("mascotas/nueva", {
          titulo: "Nueva mascota",
          error: "Todos los campos son obligatorios y la edad debe ser válida.",
          valores: req.body
        });
      }

      const nuevoId = mascotas[mascotas.length - 1].id + 1;
      const nuevaMascota = { id: nuevoId, nombre, especie, descripcion, edad: edadNum, estado, imagen: "/img/mascota.svg" };
      mascotas.push(nuevaMascota);

      res.redirect("/mascotas");
    });

    app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error.message);
  }
}

main();
