document.addEventListener("DOMContentLoaded", () => {
    mostrarListaDeseos();
});

function mostrarListaDeseos() {
    const productosDeseos = JSON.parse(localStorage.getItem('productosDeseos')) || [];
    let body = "";

    productosDeseos.forEach(producto => {
        body += `
            <li>
                <div class="card">
                    <div class="cont-img">
                        <img src="${producto.IMAGEN}" alt="Producto">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${producto.NOMBRE}</h5>
                        <p class="card-text">${producto.DESCRIPCION}</p>
                        <p class="card-text"><b>Precio: </b> ${producto.PRECIO}</p>
                        <p class="card-text"><b>Stock: </b>${producto.STOCK}</p>
                        
                        &nbsp
                        &nbsp

                        <div class="cont-btn">
                            &nbsp
                            &nbsp
                            <!-- Eliminar -->
                            <button class="noselect" onclick="eliminarProducto('${producto.ID}');">
                             <span class="text">
                             Eliminar
                             </span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z">
                             </path>
                             </svg>
                             </span>
                             </button>

                        </div>
                    </div>
                </div>
            </li>
        `;
    });

    document.getElementById("Ldeseos").innerHTML = body;
}

function redirectToWhatsApp() {
    const numeroTelefono = '573234377424'; // Reemplaza con tu número de WhatsApp
    let productosDeseos = JSON.parse(localStorage.getItem('productosDeseos')) || [];
    
    // Obtener todos los nombres de los productos
    const nombresProductos = productosDeseos.map(producto => producto.NOMBRE);
    
    // Crear el mensaje con los nombres de los productos separados por comas
    const mensaje = `¡Hola! :).
Estoy super interesad@ en comprar los productos "${nombresProductos.join(', ')}" <3.
Me darías más información por favor.`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;

    window.location.href = urlWhatsApp;
}

function eliminarProducto(productId) {
    console.log('Intentando eliminar producto con ID:', productId); // Agregar un log para verificar el ID del producto
    let productosDeseos = JSON.parse(localStorage.getItem('productosDeseos')) || [];
    console.log('Productos antes de eliminar:', productosDeseos); // Verificar los productos antes de eliminar
    productosDeseos = productosDeseos.filter(prod => prod.ID.toString() !== productId.toString());
    console.log('Productos después de eliminar:', productosDeseos); // Verificar los productos después de eliminar
    localStorage.setItem('productosDeseos', JSON.stringify(productosDeseos));
    Swal.fire({
        title: 'Producto Eliminado',
        text: 'El producto se ha eliminado de la lista de deseos.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        mostrarListaDeseos(); // Actualiza la lista después de eliminar el producto
    });
}
