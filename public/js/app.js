// public/js/app.js

console.log("Aplicación de adopción de mascotas cargada correctamente.");

// Ejemplo opcional: resaltar el foco en los formularios
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, select, textarea, button");
  inputs.forEach(el => {
    el.addEventListener("focus", () => {
      el.style.outline = "2px solid #0066cc";
    });
    el.addEventListener("blur", () => {
      el.style.outline = "none";
    });
  });
});
