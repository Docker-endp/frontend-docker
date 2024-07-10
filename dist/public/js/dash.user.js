// Espera a que se cargue completamente la ventana antes de ejecutar el código
window.onload = function() {
  obtenerNombreUsuario(); // Llama a la función para obtener el nombre del usuario

  
    // Obtiene el elemento de la flecha para ocultar/mostrar el menú
    var toggleArrow = document.getElementById('toggleArrow');
    // Obtiene el menú
    var menu = document.getElementById('menu');
    // Inicializa una variable para rastrear si el menú está visible o no
    var isMenuVisible = true;
  
    // Agrega un evento de clic a la flecha
    toggleArrow.addEventListener('click', function() {
        // Cambia el estado de visibilidad del menú
        isMenuVisible = !isMenuVisible;
        // Modifica la visibilidad del menú según su estado
        menu.style.visibility = isMenuVisible ? 'visible' : 'hidden';
    });
  };
  
  // Función para mostrar la ventana de servicio al cliente
  function mostrarServicio(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    
    // Obtiene la ventana principal de servicio al cliente
    var main = document.getElementById('main');
    // Muestra la ventana de servicio al cliente
    main.style.display = 'block';
  }


// VERIFICAR INGRESO
const url = sessionStorage.getItem("urlApi");
const token = sessionStorage.getItem("token");

  // CERRAR SESION
const cerrarSesion = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("urlApi", "");
    window.location.href = '/login';
}


const urlComprobar = url + "/api/oauth";

if (token == "" || token == null) {
  window.location.href = "/login"
};
if (url == "" || url == null) {
  window.location.href = "/login"
};

const options = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
     'Authorization' : `Bearer ${token}`
  }
}
fetch(urlComprobar, options)
  .then(res => res.json())
  .then(data => {
    if (data.error == true) {
      window.location.href = "/login"
    }
  });




  

  // Función para obtener el nombre del usuario
function obtenerNombreUsuario() {
  const url = sessionStorage.getItem("urlApi");
  const token = sessionStorage.getItem("token");
  const userEmail = sessionStorage.getItem("email"); // Obtiene el correo del usuario desde sessionStorage
  const urlObtenerUsuario = `${url}/api/user/${userEmail}`;
  
  const options = {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  };

  fetch(urlObtenerUsuario, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.body[0][0][0].NOMBRE);
          if (data && data.body[0][0][0].NOMBRE) {
              // Almacena el nombre del usuario en sessionStorage
              sessionStorage.setItem('userName', data.body[0][0][0].NOMBRE);
              // Actualiza el NOMBRE en la interfaz de usuario
              document.querySelector('.nom-user').textContent = data.body[0][0][0].NOMBRE;
          } else {
              // Manejo del error en caso de que no se encuentre el usuario
              console.error('No se encontró el usuario.');
          }
      })
      .catch(error => {
          // Manejo del error en caso de que falle la solicitud
          console.error('Error al obtener los datos del usuario:', error);
      });
}

  



  