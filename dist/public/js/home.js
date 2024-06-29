let lastScrollTop = 0; // Guarda la posición anterior del scroll
let isScrollingByClick = false; // Bandera para detectar el scroll por clic

// Evento para detectar el scroll
window.addEventListener("scroll", function() {
    if (isScrollingByClick) return; // No ejecutar animaciones si se está haciendo scroll por clic

    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0); // Agrega o quita la clase 'abajo' al header basado en la posición del scroll

    const boxes = document.querySelectorAll('.box:not(.box1)'); // Selecciona todas las cajas menos la primera
    const scrollTop = document.documentElement.scrollTop; // Obtiene la posición actual del scroll

    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top; // Obtiene la posición de la caja relativa a la ventana
        const windowHeight = window.innerHeight; // Altura de la ventana

        if (scrollTop > lastScrollTop) {
            // Scroll Down (Hacia abajo)
            if (boxTop < windowHeight - 50 && !box.classList.contains('visible')) {
                box.classList.add('visible'); // Muestra la caja
                box.classList.remove('hidden'); // Asegura que no esté oculta
                box.classList.remove('right'); // Asegura que no tenga la clase 'right'
            }
        }
    });

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Actualiza la posición del scroll
});

// Evento para cargar el contenido inicialmente
document.addEventListener("DOMContentLoaded", function() {
    const firstBox = document.querySelector('.box1');
    firstBox.classList.add('visible'); // Muestra la primera caja al cargar la página
});

// Añadir manejador de clic para los enlaces de navegación
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        isScrollingByClick = true; // Activar la bandera

        // Esperar hasta que la animación de desplazamiento termine antes de reactivar las animaciones de las cajas
        setTimeout(() => {
            isScrollingByClick = false;
        }, 1000); // Ajusta este valor según la duración de la animación de desplazamiento

        // Desplazamiento suave al hacer clic en el enlace
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Ajusta para tener en cuenta la altura del encabezado fijo
            behavior: 'smooth'
        });

        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    });
});

// Manejadores para abrir y cerrar el menú lateral
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '250px';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('sidebar').style.width = '0';
});

// Cerrar el menú lateral al hacer clic en un enlace del menú
document.querySelectorAll('#sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.getElementById('sidebar').style.width = '0';
    });
});
