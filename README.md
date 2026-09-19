# NODOTP4_Aplicaci-nwebconEJS
Descripción

Este proyecto implementa una aplicación web con Express y EJS para administrar temporalmente un catálogo de mascotas en adopción. La aplicación permite consultar mascotas disponibles, ver detalles y agregar nuevas mediante un formulario. Todas las páginas se renderizan en HTML utilizando vistas EJS.

 Importante: los registros creados mediante el formulario se almacenan solo en memoria mientras el servidor está activo. Al reiniciar, los datos vuelven al estado inicial definido en datos/mascotas.json.

Instalación

Clonar el repositorio:

git clone https://github.com/canayorui/NODO_TP4_Mascotas-EJS.git

Instalar dependencias:

npm install

Ejecución

Iniciar el servidor:

npm start

Detener el servidor: Ctrl + C en la terminal.

El servidor se ejecuta por defecto en:http://localhost:3000

Páginas y rutas

GET / → Página inicial con título, explicación breve y enlace al catálogo.

GET /mascotas → Listado de mascotas con tarjetas y enlace al detalle.

GET /mascotas/nueva → Formulario para agregar una nueva mascota.

GET /mascotas/:id → Detalle de una mascota específica.

POST /mascotas → Procesa el formulario, valida datos y redirige al listado.

 Estructura de vistas

Layout principal (layouts/main.ejs): estructura HTML base con <%- body %>.

Parciales (partials/encabezado.ejs, partials/pie.ejs): navegación y pie de página.

Inicio (inicio.ejs): título y enlace al catálogo.

Listado (mascotas/lista.ejs): recorre el arreglo y muestra tarjetas.

Detalle (mascotas/detalle.ejs): muestra datos completos e imagen.

Formulario (mascotas/nueva.ejs): controles etiquetados, validación y mensajes de error.

404 (no-encontrado.ejs): página de error cuando el ID no existe.

Diferencias clave

Layout: estructura general compartida.

Vista: página completa para un endpoint.

Parcial: fragmento reutilizable (encabezado, pie).

 Recursos estáticos

CSS (/css/estilos.css): tipografía, colores, grilla, tarjetas, formulario, mensajes de error.

Imagen (/img/mascota.svg): recurso local para todas las mascotas.

JavaScript (/js/app.js): mensaje en consola y mejora de accesibilidad.

Los recursos se sirven con express.static y se referencian sin incluir /public en la URL.

 Formulario y validación

Controles: nombre, especie, edad, estado (select), descripción.

Validación: todos los campos obligatorios, edad numérica ≥ 0.

En caso de error: responde 400, renderiza el formulario con mensaje role="alert" y conserva valores.

En caso válido: genera ID, asigna /img/mascota.svg, agrega al arreglo en memoria y redirige al listado.

El procesamiento se realiza con express.urlencoded({ extended: false }).

 Persistencia de los datos

Los registros creados existen solo en memoria.

Al reiniciar el servidor, se recargan los datos iniciales desde datos/mascotas.json.

No se escribe en el archivo JSON ni se usa base de datos.

 Explicaciones técnicas

res.render: envía datos a las vistas EJS para mostrarlos dinámicamente.

express.static: sirve archivos CSS, JS e imágenes.

express.urlencoded: permite leer datos de formularios.

Recorrido POST → redirección → GET: tras un envío válido, se redirige al listado para mostrar la nueva tarjeta.

 Criterios de prueba

Inicio: 200, título y enlace al catálogo.

Listado: 200 y cinco mascotas iniciales.

Estado vacío: 200 y mensaje alternativo.

Detalle válido: 200, datos completos e imagen.

Detalle inexistente: 404 y página HTML de error.

Formulario: 200 y controles etiquetados.

Envío incompleto: 400, mensaje y valores conservados.

Edad inválida: 400, mensaje y valores conservados.

Envío válido: redirección 302 seguida de 200 y nueva tarjeta.

CSS, SVG y JS: 200 y recursos aplicados.

Reinicio: 200 y regreso a los cinco registros iniciales.