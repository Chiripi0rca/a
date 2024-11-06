
//funcion para redigir a la pagina de inicio de sesion
function RedigirInicioDeSesion(){
  window.location.href ="Login.html";
}

// Función para guardar usuario y redirigir
function guardarUsuario() {
    const user = document.getElementById("email-input").value; // Captura el email del input
    console.log("Usuario ingresado:", user); // Muestra el usuario ingresado en la consola
    if (user.trim() === "") {
        alert("Por favor, ingresa un usuario antes de continuar."); // Mensaje de alerta si está vacío
    } else {
        localStorage.setItem("user", user); // Guarda el usuario en Local Storage
        window.location.href = "signup.html"; // Redirige a la página de registro
    }
}


// Al cargar la página de registro, recupera el nombre de usuario desde Local Storage
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    const signupUserInput = document.getElementById("signup-user");
    if (user && signupUserInput) {
        signupUserInput.value = user; // Muestra el usuario en el campo de entrada
    }
});
// Función para registrar un usuario
function registrarUsuario() {
    const username = document.getElementById("signup-user").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
        // Guarda el usuario y la contraseña por separado
        localStorage.setItem(username, password); // Asegúrate de usar el username como clave
        alert("Cuenta creada con éxito");
        window.location.href = "Login.html";
    } else {
        alert("Por favor, completa todos los campos");
    }
}

// Función para iniciar sesión
function iniciarSesion() {
    const username = document.getElementById("login-user").value;
    const password = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("error-msg");

    const storedPassword = localStorage.getItem(username); // Recupera la contraseña

    if (storedPassword && storedPassword === password) {
        errorMsg.textContent = ""; // Limpia el mensaje de error
        alert("Inicio de sesión exitoso. Redirigiendo a la página mas perrona.");
        window.location.href = "Main.html";
    } else {
        errorMsg.textContent = "Nombre de usuario o contraseña incorrectos";
    }
}
  function enviarUsuario() {
    const usuario = document.getElementById("reset-usuario").value;
    const msg = document.getElementById("msg");

    // Verificar si el usuario está registrado
    const storedPassword = localStorage.getItem(usuario); // Recupera la contraseña asociada al usuario

    if (usuario.trim() === "") {
        msg.textContent = "Por favor, ingresa un nombre de usuario.";
    } else if (!storedPassword) {
        msg.textContent = "No hay ninguna cuenta registrada con ese usuario.";
    } else {
        // Almacenar el usuario en localStorage y redirigir a la página de nueva contraseña
        localStorage.setItem("usuarioParaReset", usuario);
        window.location.href = "NewPassword.html"; // Redirige a la página de nueva contraseña
    }
}

function actualizarContrasena() {
    const usuario = localStorage.getItem("usuarioParaReset");
    const nuevaContrasena = document.getElementById("nueva-contrasena").value;
    const msg = document.getElementById("msg");

    if (!usuario) {
        msg.textContent = "No se encontró el usuario.";
        return;
    }

    if (nuevaContrasena.trim() === "") {
        msg.textContent = "Por favor, ingresa una nueva contraseña.";
    } else {
        localStorage.setItem(usuario, nuevaContrasena); // Actualiza la contraseña
        msg.textContent = "Tu contraseña ha sido restablecida con éxito.";
        setTimeout(() => { //esto hace que esperes un tiempo para que puedas ser dirirgido al login
            window.location.href = "Login.html"; 
        }, 2000); // Retraso de 2 segundos
    }
}

//funcion para cuando le piquen al boton de suscribirse los reegrese a la pagina princiapl donde dice comenzar
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash === "#email") {
        const emailInput = document.getElementById("email-input");
        if (emailInput) {
            emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
            emailInput.focus(); // Coloca el cursor en el campo de correo
        }
    }
});
    //bloque para las preguntas frecuentes
    document.querySelectorAll('.faq-question').forEach((button) => {
      button.addEventListener('click', () => {
          const answer = button.nextElementSibling;
 
          // Toggle answer visibility
          if (answer.style.display === 'block') {
              answer.style.display = 'none';
          } else {
              // Close any other open answers
              document.querySelectorAll('.faq-answer').forEach((ans) => ans.style.display = 'none');
              answer.style.display = 'block';
          }
 
          // Toggle active state
          document.querySelectorAll('.faq-question').forEach((btn) => btn.classList.remove('active'));
          button.classList.toggle('active');
      });
  });

  //Funcion para cerrar sesion
  function CerrarSesion(){
    const confirmacion = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if(confirmacion){
      setTimeout(() => { //esto hace que esperes un tiempo para que puedas ser dirirgido al login
            window.location.href = "index.html"; 
        }, 1000); // Retraso de 2 segundos
    }
    else
        alert("Cancelado. No se ha cerrado sesion");
  }

// Cargar el nombre de usuario en el menú desplegable al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("user");
    if (usuario) {
        document.getElementById("usuario-link").textContent = usuario;
    }
});

//este cuadro de codigo sirve para mostrar videos de las categorias(fortnite, valorant,etc)
document.querySelectorAll(".game-link").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();  // Evitar la acción predeterminada del enlace

        // Obtener el nombre del juego seleccionado
        const selectedGame = this.getAttribute("data-game");

        // Ocultar todas las categorías de videos
        document.querySelectorAll(".video-category").forEach(category => {
            category.style.display = "none";
        });

        // Mostrar solo la categoría correspondiente al juego seleccionado
        const selectedCategory = document.querySelector(".video-category");

        if (selectedCategory) {
            selectedCategory.style.display = "block";  // Mostrar solo la categoría
            // Cambiar el título de la categoría a "Videos"
            selectedCategory.querySelector("h2").textContent = "Videos";

        }

        // Mostrar solo los videos del juego seleccionado
        document.querySelectorAll(".video-item").forEach(videoItem => {
            if (videoItem.getAttribute("data-game") === selectedGame) {
                videoItem.style.display = "block";  // Mostrar el video
            } else {
                videoItem.style.display = "none";  // Ocultar el video
            }
        });
    });
});


// Función para agregar video a Favoritos
function agregarAFavoritos(videoSrc) {
    const favoritosContainer = document.getElementById('favoritos-carousel');

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!favoritos.includes(videoSrc)) {
        favoritos.push(videoSrc);
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Guardamos en localStorage

        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;

        favoritosContainer.appendChild(nuevoVideo);
    }
}

// Función para cargar los videos de Favoritos desde localStorage
function cargarFavoritos() {
    const favoritosContainer = document.getElementById('favoritos-carousel');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos.forEach(videoSrc => {
        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;
        favoritosContainer.appendChild(nuevoVideo);
    });
}

// Función para agregar video a "Lista"
function agregarALista(videoSrc) {
    const listaContainer = document.getElementById('lista-carousel');

    let lista = JSON.parse(localStorage.getItem('lista')) || [];
    if (!lista.includes(videoSrc)) {
        lista.push(videoSrc);
        localStorage.setItem('lista', JSON.stringify(lista)); // Guardamos en localStorage

        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;

        listaContainer.appendChild(nuevoVideo);
    }
}

// Función para cargar los videos de "Lista" desde localStorage
function cargarLista() {
    const listaContainer = document.getElementById('lista-carousel');
    const lista = JSON.parse(localStorage.getItem('lista')) || [];

    lista.forEach(videoSrc => {
        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;
        listaContainer.appendChild(nuevoVideo);
    });
}

// Función para agregar video a "Volver a ver"
function agregarAVolverAVer(videoSrc) {
    const volverAVerContainer = document.getElementById('volver-a-ver-carousel');

    let volverAVer = JSON.parse(localStorage.getItem('volverAVer')) || [];
    if (!volverAVer.includes(videoSrc)) {
        volverAVer.push(videoSrc);
        localStorage.setItem('volverAVer', JSON.stringify(volverAVer)); // Guardamos en localStorage

        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;

        volverAVerContainer.appendChild(nuevoVideo);
    }
}

// Función para cargar los videos de "Volver a ver" desde localStorage
function cargarVolverAVer() {
    const volverAVerContainer = document.getElementById('volver-a-ver-carousel');
    const volverAVer = JSON.parse(localStorage.getItem('volverAVer')) || [];

    volverAVer.forEach(videoSrc => {
        const nuevoVideo = document.createElement('video');
        nuevoVideo.src = videoSrc;
        nuevoVideo.controls = true;
        volverAVerContainer.appendChild(nuevoVideo);
    });
}

// Cargar todos los videos al cargar la página
window.onload = function() {
    cargarFavoritos();
    cargarLista();
    cargarVolverAVer();
}

// Asignar evento de clic a los botones de favoritos y lista
document.querySelectorAll('.favoritos-btn').forEach(button => {
    button.addEventListener('click', function() {
        const video = this.closest('.video-item').querySelector('video');
        const videoSrc = video.src;  // Obtener la fuente del video
        agregarAFavoritos(videoSrc);
    });
});

document.querySelectorAll('.lista-btn').forEach(button => {
    button.addEventListener('click', function() {
        const video = this.closest('.video-item').querySelector('video');
        const videoSrc = video.src;  // Obtener la fuente del video
        agregarALista(videoSrc);
    });
});

// Agregar el video al "Volver a ver" cuando se reproduce un video
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', function() {
        const videoSrc = video.src;  // Obtener la fuente del video
        agregarAVolverAVer(videoSrc);  // Agregar a "Volver a ver"
    });
});
