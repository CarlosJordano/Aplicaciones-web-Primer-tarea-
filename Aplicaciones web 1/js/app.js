$(document).ready(function () {
  // --- 1. Alerta de Bienvenida Única ---
  if (!localStorage.getItem('bienvenidaMostrada')) {
    alert("¡Bienvenido a CinePlus! Descubre los mejores estrenos y clásicos.");
    localStorage.setItem('bienvenidaMostrada', 'true');
  }

  // --- 2. Marcar Navbar Activo ---
  let path = window.location.pathname;
  let page = path.split("/").pop();
  if (page === "") page = "index.html";
  $('.nav-link').each(function () {
    if ($(this).attr('href') === page || $(this).attr('href') === '../' + page) {
      $(this).addClass('active');
    }
  });

  // --- 3. Lógica de Fechas y Precios ---
  function esEstreno(fechaEstrenoISO) {
    if (!fechaEstrenoISO) return false;
    const hoy = new Date();
    const estreno = new Date(fechaEstrenoISO);
    const diffTime = hoy - estreno;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30; // Es estreno si tiene 30 días o menos
  }

  // --- 4. Renderizado de Películas en Index ---
  function renderPeliculas(peliculas) {
    let html = "";
    if (!peliculas || peliculas.length === 0) {
      html = `<div class="col-12 text-center py-5"><p class="text-muted fs-4">No hay películas disponibles actualmente.</p></div>`;
    } else {
      peliculas.forEach(function (peli) {
        let isNuevo = esEstreno(peli.estreno);
        // Validar que existan los precios, si no, poner valores por defecto
        let precioEstreno = peli.precios && peli.precios.estreno ? peli.precios.estreno : 15.00;
        let precioNormal = peli.precios && peli.precios.normal ? peli.precios.normal : 5.00;
        
        let precioActual = isNuevo ? precioEstreno : precioNormal;
        let badge = isNuevo 
          ? `<span class="badge bg-danger">¡ESTRENO!</span>` 
          : `<span class="badge bg-secondary">Cartelera Regular</span>`;

        html += `
          <div class="col-12 col-sm-6 col-lg-4 mb-4" style="display:none;">
            <div class="card h-100 shadow-sm pelicula-card">
              <img src="${peli.imagen}" class="card-img-top" alt="Póster de ${peli.titulo}" onerror="this.src='https://placehold.co/500x750/1e1e1e/FFF?text=Sin+Imagen'">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold">${peli.titulo}</h5>
                <p class="card-text text-muted mb-2">${peli.generos ? peli.generos.join(", ") : peli.genero}</p>
                <div class="mb-3">
                  ${badge} <span class="fw-bold ms-2">$${precioActual.toFixed(2)}</span>
                </div>
                <div class="mt-auto d-flex justify-content-between">
                  <button class="btn btn-primary w-100 me-2 shadow-sm btn-detalles" data-id="${peli.id}">Detalles</button>
                  <button class="btn btn-dark w-100 shadow-sm btn-trailer" data-trailer="${peli.trailer}" data-bs-toggle="modal" data-bs-target="#trailerModal">Ver Tráiler</button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
    
    $("#loading").hide();
    const $lista = $("#lista-peliculas").html(html);
    
    $lista.find('.col-12').each(function(i) {
      $(this).delay(150 * i).fadeIn(600);
    });
  }

  // --- DATOS DE RESPALDO ACTUALIZADOS ---
  const peliculasFallback = [
    { id: 1, titulo: "Dune", imagen: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", generos: ["Aventura"], trailer: "https://www.youtube.com/embed/n9xhJrPXop4", estreno: "2021-10-22", precios: { estreno: 15.00, normal: 5.00 } },
    { id: 2, titulo: "50 primeras citas", imagen: "https://image.tmdb.org/t/p/w500/A0H3k0U2t8RkOqG8S2pDkSj4P4H.jpg", generos: ["Comedia"], trailer: "https://www.youtube.com/embed/Q_2AbjYeSMI", estreno: "2004-02-13", precios: { estreno: 12.00, normal: 4.00 } },
    { id: 3, titulo: "Batman: Caballero de la Noche", imagen: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", generos: ["Acción"], trailer: "https://www.youtube.com/embed/EXeTwQWrcwY", estreno: "2008-07-18", precios: { estreno: 14.00, normal: 6.00 } },
    { id: 4, titulo: "Spider-Man: No Way Home", imagen: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1Zq1kLzEofYQ2u.jpg", generos: ["Acción"], trailer: "https://www.youtube.com/embed/JfVOs4VSpmA", estreno: "2021-12-15", precios: { estreno: 18.00, normal: 7.00 } },
    { id: 5, titulo: "Maze Runner: La Cura Mortal", imagen: "https://image.tmdb.org/t/p/w500/2L2Pz3t7K13R7UjY5tC9w4qGv4l.jpg", generos: ["Acción", "Ciencia Ficción"], trailer: "https://www.youtube.com/embed/S_9OSktlm6s", estreno: "2018-01-26", precios: { estreno: 14.00, normal: 5.00 } },
    { id: 6, titulo: "Matrix", imagen: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", generos: ["Ciencia Ficción", "Acción"], trailer: "https://www.youtube.com/embed/vKQi3bBA1y8", estreno: "1999-03-31", precios: { estreno: 12.00, normal: 4.00 } },
    { id: 7, titulo: "Misión Imposible: Sentencia Final", imagen: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg", generos: ["Acción"], trailer: "https://www.youtube.com/embed/2m1drlOZSDw", estreno: "2026-05-22", precios: { estreno: 20.00, normal: 10.00 } },
    { id: 8, titulo: "Búsqueda Implacable", imagen: "https://image.tmdb.org/t/p/w500/wR5H8Q0n0vB9B3p23jJ2d25L2R2.jpg", generos: ["Acción", "Suspense"], trailer: "https://www.youtube.com/embed/uPJVj1h0_E4", estreno: "2008-02-27", precios: { estreno: 14.00, normal: 5.50 } }
  ];

  // --- 5. Cargar JSON o Usar Respaldo ---
  if ($("#lista-peliculas").length) {
    setTimeout(() => {
      $.ajax({
        url: "data/peliculas.json",
        method: "GET",
        dataType: "json",
        success: function (peliculas) {
          window.peliculasGlobal = peliculas;
          renderPeliculas(peliculas);
        },
        error: function () {
          // Si falla (por usar file:///), usamos los datos de respaldo
          window.peliculasGlobal = peliculasFallback;
          renderPeliculas(peliculasFallback);
        }
      });
    }, 2000); // Retraso de 2 segundos
  }

  // --- 6. Manejo del Modal de Tráiler (Corrección para Iframe) ---
  $(document).on('click', '.btn-trailer', function() {
    let urlTrailer = $(this).data('trailer');
    
    // CORRECCIÓN: Si el enlace viene como watch?v= lo convertimos a embed/ para que el iframe no lo bloquee.
    if (urlTrailer.includes("watch?v=")) {
      urlTrailer = urlTrailer.replace("watch?v=", "embed/");
    } else if (urlTrailer.includes("youtu.be/")) {
      urlTrailer = urlTrailer.replace("youtu.be/", "youtube.com/embed/");
    }

    $("#trailerIframe").attr("src", urlTrailer);
  });
  
  $('#trailerModal').on('hidden.bs.modal', function () {
    // Limpiar el src para que el video deje de sonar al cerrar el modal
    $("#trailerIframe").attr("src", "");
  });

  // --- 7. Validaciones Formulario Contacto ---
  if ($("#form-contacto").length) {
    $("#form-contacto").on("submit", function (e) {
      e.preventDefault();
      let nombre = $("#nombre").val().trim();
      let correo = $("#correo").val().trim();
      let mensaje = $("#mensaje").val().trim();
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let errores = [];

      if (nombre.length < 3) errores.push("- El nombre debe tener al menos 3 caracteres.");
      if (!emailRegex.test(correo)) errores.push("- Ingresa un correo electrónico válido.");
      if (mensaje.length < 20 || mensaje.length > 50) errores.push("- El mensaje debe tener entre 20 y 50 caracteres.");

      let $errorDiv = $("#form-errores");
      if (errores.length > 0) {
        $errorDiv.html(errores.join("<br>")).slideDown();
      } else {
        $errorDiv.slideUp();
        alert("¡Mensaje enviado con éxito!");
        this.reset();
      }
    });
  }

  // --- 8. Lógica Formulario de Renta ---
  if ($("#form-renta").length) {
    function cargarOpcionesRenta(peliculas) {
      let options = "";
      peliculas.forEach(p => {
        let isNuevo = esEstreno(p.estreno); 
        let precioEstreno = p.precios && p.precios.estreno ? p.precios.estreno : 15.00;
        let precioNormal = p.precios && p.precios.normal ? p.precios.normal : 5.00;
        let precio = isNuevo ? precioEstreno : precioNormal;
        
        options += `<option value="${p.id}" data-precio="${precio}">${p.titulo} ($${precio.toFixed(2)}/día)</option>`;
      });
      $("#peliculaRenta").html(options);
    }

    // Intentar cargar el JSON, si falla usar respaldo
    $.ajax({
      url: "data/peliculas.json",
      method: "GET",
      dataType: "json",
      success: function(peliculas) { cargarOpcionesRenta(peliculas); },
      error: function() { cargarOpcionesRenta(peliculasFallback); }
    });

    $("#form-renta").on("submit", function(e) {
      e.preventDefault();
      let cliente = $("#clienteNombre").val();
      let dias = parseInt($("#diasRenta").val());
      let metodo = $("#metodoPago").val();
      let seleccionadas = $("#peliculaRenta option:selected");
      
      let total = 0;
      let nombresPeliculas = [];

      seleccionadas.each(function() {
        total += parseFloat($(this).data('precio')) * dias;
        nombresPeliculas.push($(this).text().split(' ($')[0]);
      });

      if (nombresPeliculas.length === 0) {
        alert("Selecciona al menos una película.");
        return;
      }

      $("#resCliente").text(cliente);
      $("#resPeliculas").text(nombresPeliculas.join(", "));
      $("#resDias").text(dias);
      $("#resTotal").text("$" + total.toFixed(2));
      $("#resMetodo").text(metodo);

      let modalRenta = new bootstrap.Modal(document.getElementById('modalRecibo'));
      modalRenta.show();
    });
  }
  // --- 9. Lógica del Modal de Detalles y Reseñas ---
  $(document).on('click', '.btn-detalles', function() {
    let id = $(this).data('id');
    
    // Buscar la película en los datos globales que ya cargamos antes
    let peli = window.peliculasGlobal.find(p => p.id === id);
    if (!peli) return;

    let isNuevo = esEstreno(peli.estreno);
    let precio = isNuevo ? (peli.precios.estreno || 15) : (peli.precios.normal || 5);

    // 1. Dibujar la información principal de la película
    let htmlDetalle = `
      <div class="row mb-4">
        <div class="col-md-4 text-center">
          <img src="${peli.imagen}" class="img-fluid rounded shadow-sm" alt="${peli.titulo}" onerror="this.src='https://placehold.co/500x750/1e1e1e/FFF?text=Sin+Imagen'">
        </div>
        <div class="col-md-8 d-flex flex-column justify-content-center">
          <h3 class="fw-bold text-dark">${peli.titulo}</h3>
          <div class="mb-2">
            <span class="badge ${isNuevo ? 'bg-danger' : 'bg-secondary'} me-1">${isNuevo ? '🎬 Estreno' : '📽️ Cartelera'}</span>
            <span class="badge bg-dark">${peli.generos ? peli.generos.join(", ") : peli.genero}</span>
          </div>
          <p class="text-muted mt-2">${peli.sinopsis}</p>
          <h4 class="fw-bold mt-auto text-end">Precio: <span class="text-success">$${precio.toFixed(2)}</span></h4>
        </div>
      </div>
      <hr>
      <h5 class="fw-bold mb-3 text-center">Reseñas de la Comunidad</h5>
      <div id="modal-reseñas" class="row g-3">
        <div class="text-center w-100"><div class="spinner-border text-warning" role="status"></div></div>
      </div>
    `;

    // Inyectar HTML y mostrar el Modal
    $("#detalleCuerpo").html(htmlDetalle);
    let detalleModal = new bootstrap.Modal(document.getElementById('detalleModal'));
    detalleModal.show();


  $.getJSON("data/resenas.json", function(resenasGenerales) {

    let resenasPeli = resenasGenerales.filter(r => r.peliculaId === id);
    let htmlResenas = "";

    if (resenasPeli.length > 0) {
      resenasPeli.forEach(r => {
        let estrellasLlenas = "★".repeat(r.estrellas);
        let estrellasVacias = "☆".repeat(5 - r.estrellas);

        htmlResenas += `
          <div class="col-md-6">
            <div class="card h-100 shadow-sm border-0">
              <div class="card-body p-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <strong class="text-primary">${r.usuario}</strong>
                  <span class="fs-5 text-warning">
                    ${estrellasLlenas}
                    <span class="text-secondary">${estrellasVacias}</span>
                  </span>
                </div>
                <p class="mb-0 text-muted fst-italic">"${r.comentario}"</p>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      htmlResenas = `
        <div class="col-12 text-center text-muted">
          <p>Aún no hay reseñas para esta película.</p>
        </div>
      `;
    }

    $("#modal-reseñas").html(htmlResenas);

  }).fail(function () {
    $("#modal-reseñas").html(`
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          Error al cargar las reseñas. Verifica el archivo resenas.json
        </div>
      </div>
    `);
    });
  });
  
});
