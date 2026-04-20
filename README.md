# CinePlus – Proyecto Web

## Descripción del Proyecto

CinePlus es una aplicación web desarrollada como proyecto académico en la carrera de Ingeniería en Software.  
El objetivo del proyecto es simular una plataforma básica de cartelera y renta de películas, aplicando los conocimientos adquiridos hasta cuarto semestre.

La aplicación permite al usuario visualizar películas disponibles, identificar estrenos, consultar información detallada, ver reseñas, reproducir tráilers, rentar películas y enviar mensajes mediante un formulario de contacto.

---

## Datos del Estudiante

- Nombre: Carlos Jordano Guerrero Suarez  
- Carrera: Ingeniería en Software  
- Semestre: Cuarto semestre  
- Proyecto: CinePlus – Aplicación Web  
- Año: 2026  

---

## Tecnologías Utilizadas

- HTML5  
- CSS3  
- JavaScript  
- jQuery  
- Bootstrap 5  
- JSON  
- LocalStorage  

---

## Funcionalidades Implementadas

### Cartelera de Películas
- Carga dinámica de películas desde un archivo JSON.
- Visualización mediante tarjetas con imagen, título, género y precio.
- Animaciones al mostrar las películas.

### Estrenos
- El sistema determina si una película es estreno según su fecha de lanzamiento.
- Una película se considera estreno si tiene 30 días o menos.
- El precio cambia automáticamente entre estreno y cartelera regular.

### Detalles de Película
- Visualización en un modal con:
  - Imagen
  - Sinopsis
  - Géneros
  - Precio
- Carga dinámica de reseñas asociadas a cada película.

### Reseñas
- Lectura de reseñas desde el archivo `resenas.json`.
- Calificación representada con estrellas.
- Mensaje informativo cuando no existen reseñas.

### Tráilers
- Reproducción de tráilers desde YouTube.
- Conversión automática de enlaces para evitar errores de reproducción.
- El video se detiene al cerrar el modal.

### Renta de Películas
- Selección de una o varias películas.
- Elección del número de días de renta.
- Cálculo automático del total a pagar.
- Modal con el recibo de la renta.

### Formulario de Contacto
- Validaciones implementadas:
  - Nombre con mínimo 3 caracteres.
  - Correo electrónico válido.
  - Mensaje con una longitud entre 20 y 50 caracteres.
- Mensajes de error claros para el usuario.

### Datos de Respaldo
- Si los archivos JSON no se cargan correctamente, el sistema utiliza datos internos para evitar fallos.

---

## Estructura del Proyecto
cineplus/
│
├── index.html          # Página principal
├── renta.html          # Página de renta
├── contacto.html       # Página de contacto
│
├── css/
│   └── style.css       # Estilos generales
│
├── js/
│   ├── app.js          # Lógica principal de la aplicación
│   └── detalle.js      # Manejo de detalles (estructura)
│
├── data/
│   ├── peliculas.json  # Datos de películas
│   └── resenas.json    # Reseñas de usuarios
│
└── README.md
## Instrucciones de Uso

1. Abrir el archivo `index.html` en un navegador web.
2. Esperar la carga de la cartelera de películas.
3. Presionar el botón Detalles para ver la información completa de la película.
4. Usar la opción Ver Tráiler para reproducir el video.
5. Acceder a la sección Rentar para alquilar películas.
6. Utilizar la sección Contacto para enviar un mensaje.

Se recomienda ejecutar el proyecto utilizando un servidor local (por ejemplo, Live Server) para asegurar la correcta carga de los archivos JSON.

---

## Observaciones

- El proyecto está desarrollado únicamente en frontend.
- No utiliza base de datos ni backend.
- Su finalidad es académica y de aprendizaje.

---

## Licencia

Proyecto realizado con fines educativos.  
Las imágenes y tráilers pertenecen a sus respectivos propietarios.
