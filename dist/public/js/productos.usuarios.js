// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/product"
console.log(urlApi);
// MOSTRAR
fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        console.log(data.respuesta[0][0]);
        if (data.error) {
            console.error("error al mostrar datos", data);
        } else {
            mostrar(data.respuesta[0][0]);
        }
    })
    .catch(error => console.log(error));

const mostrar = (data) => {
    console.log(data[0]);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <li>
                    <div class="card">
                        <div class="cont-img">
                            <img src="${data[i].IMAGEN}" alt="Producto">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${data[i].NOMBRE}</h5>
                            <p class="card-text">${data[i].DESCRIPCION}</p>
                            <p class="card-text"><b>Precio: </b> ${data[i].PRECIO}</p>
                            <p class="card-text"><b>Stock: </b>${data[i].STOCK}</p>
                        
                            <div class="content-btn">
                              &nbsp
                              &nbsp
                              &nbsp
                                <!-- AGREGAR -->
                                <button onclick="agregarProducto('${data[i].ID}');">
                                
                                   Agregar
                                </button> 
                            </div>

                        </div>
                    </div>
                </li>                     
    `;
    }

    document.getElementById("data").innerHTML = body;

};




// BARRA DE BUSQUEDA
// Función para buscar productos
const buscarProducto = () => {
    const valorBusqueda = document.getElementById("datos-busqueda").value.toLowerCase();
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error("error al mostrar datos", data);
            } else {
                const resultados = data.respuesta[0][0].filter(producto => {
                    return producto.NOMBRE.toLowerCase().includes(valorBusqueda) || producto.ID.toString().includes(valorBusqueda);
                });
                
                if (resultados.length > 0) {
                    mostrar(resultados);
                } else {
                    Swal.fire({
                        title: "Sin resultados",
                        text: "No se encontraron productos que coincidan con la búsqueda",
                        icon: "info",
                    });
                }
            }
        })
        .catch(error => console.log(error));
};

// Evento para buscar al presionar Enter (BARRA DE BUSQUEDA)
document.getElementById("datos-busqueda").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        buscarProducto();
    }
});

// Mostrar productos al cargar la página
fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar datos", data);
        } else {
            mostrar(data.respuesta[0][0]);
        }
    })
    .catch(error => console.log(error));


// AGREGAR A LA LISTA DE DESEOS
function agregarProducto(productId) {
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            const productos = data.respuesta[0][0];
            const producto = productos.find(prod => prod.ID == productId);

            if (producto) {
                let productosDeseos = JSON.parse(localStorage.getItem('productosDeseos')) || [];

                // Verifica si el producto ya está en la lista de deseos
                const productoExistente = productosDeseos.some(prod => prod.ID == productId);

                if (productoExistente) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Producto Repetido',
                        text: 'Este producto ya está en la lista de deseos.'
                    });
                } else if (productosDeseos.length >= 10) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Lista Llena',
                        text: 'No puedes agregar más de 10 productos a la lista de deseos.'
                    });
                } else {
                    productosDeseos.push(producto);
                    localStorage.setItem('productosDeseos', JSON.stringify(productosDeseos));
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto Agregado',
                        text: 'El producto ha sido agregado a la lista de deseos.'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al agregar producto.'
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Hubo un problema al intentar conectar con el servidor.'
            });
        });
}


