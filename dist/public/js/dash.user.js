// Espera a que se cargue completamente la ventana antes de ejecutar el código
window.onload = function() {
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
  
  
  
    
    
  
  
  const searchInput = document.getElementById('datos-busqueda');
  const searchResults = document.getElementById('result-busqueda');
  
  // Detectar cuando se presiona la tecla "Enter" en el campo de texto
  // Agregar un event listener al campo de búsqueda para detectar cuando se escribe
  searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          const query = searchInput.value.trim(); // Obtener el texto de búsqueda sin espacios al inicio y al final
          if (query !== '') {
              searchResults.innerHTML = `Buscando resultados para: <strong>${query}</strong>`;
              
          } else {
              let mensaje = 'Por favor ingresa un término de búsqueda.';
              searchResults.innerHTML = alert(mensaje);
          }
      }
  });
  