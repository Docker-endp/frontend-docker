// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/product"

// MOSTRAR
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

const mostrar = (data) => {
    console.log(data[0]);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <li>
                    <div class="card">
                        <div class="cont-img">
                            <img src="../img/licorF1N1.png" alt="Producto">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${data[i].NOMBRE}</h5>
                            <p class="card-text">${data[i].ID}</p>
                            <p class="card-text">${data[i].DESCRIPCION.substring(0, 20) + '...'}</p>
                            <p class="card-text"><b>Precio: </b> ${data[i].PRECIO}</p>
                            <p class="card-text"><b>Cantidad Inicial: </b>${data[i].CANT_INICIAL}</p>
                            <p class="card-text"><b>P.Comprados: </b>${data[i].COMPRADOS}</p>
                            <p class="card-text"><b>Stock: </b>${data[i].STOCK}</p>
                            <p class="card-text"><b>Id_Proveedores: </b> ${data[i].ID_PROVEEDORES}</p>
                            <div class="cont-btn">
                                <!-- eliminar -->
                                <button class="bin-button" onclick="eliminar(event);" title="Eliminar Producto">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 39 7"
                                  class="bin-top"
                                >
                                  <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
                                  <line
                                    stroke-width="3"
                                    stroke="white"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1="12"
                                  ></line>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 33 39"
                                  class="bin-bottom"
                                >
                                  <mask fill="white" id="path-1-inside-1_8_19">
                                    <path
                                      d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                    ></path>
                                  </mask>
                                  <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="white"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  ></path>
                                  <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                                  <path stroke-width="4" stroke="white" d="M21 6V29"></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 89 80"
                                  class="garbage"
                                >
                                  <path
                                    fill="white"
                                    d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                  ></path>
                                </svg>
                              </button>
                              &nbsp
                              &nbsp
                              &nbsp

                                <!-- Lista de recomendaciones -->
                                <button class="cssbuttons-io-button" title="Añadir a lista de recomendaciones" onclick="lrecomendaciones();">
                                  <svg height="25" width="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path></svg>
                                </button>
                                &nbsp
                                &nbsp
                                &nbsp

                                <!-- Productos disponibles -->
                                <button class="cssbuttons-io-button" title="Añadir a Productos Disponibles" onclick="pdispobibles();">
                                  <svg height="25" width="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path></svg>
                                </button>
                                &nbsp
                                &nbsp
                                &nbsp

                                <!-- Editar -->
                                <button class="editBtn" onclick="abrirModal(${data[i].ID});" title="Editar producto">
                                <svg height="1em" viewBox="0 0 512 512">
                                <path
                                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                ></path>
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>                     
    `;
    }

    document.getElementById("data").innerHTML = body;
};

// ELIMINAR
const eliminar = (event) => {
    const eliminar_id = event.target.parentElement.parentElement.children[1].innerText;
    console.log(eliminar_id);
    
  
    Swal.fire({
      title: "¿Seguro de que quieres eliminar este Producto?",
      text: "¡No podrás revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",

    }).then((result) => {
      if (result.isConfirmed) {
        eliminarApi(eliminar_id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "El Producto ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  
  const eliminarApi = (ID) => {
    // const token = sessionStorage.getItem("token");
    // "x-access-token": token
  
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID,
      }),
    };
  
    fetch(urlApi, options)
      .then(res => res.json())
      .then(data => {
        if (data.error == false) {
          Swal.fire(data.respuesta);
          window.location.href = "/dash/lproductos";
        }
      })
      .catch(err => {
        console.log("Tenemos un problema", err);
      });
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

// Evento para buscar al presionar Enter
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


// EDITAR PERFIL

const abrirModal = (ID) => {
    // Obtener referencia al modal y al botón de cierre
    const modal = document.getElementById("editModal");
    const span = document.getElementsByClassName("close")[0];

    // Realizar una solicitud fetch para obtener los datos del producto
    fetch(urlApi + `/${ID}`)
        .then(res => res.json()) // Convertir la respuesta a JSON
        .then(data => {
            if (!data.error) { 
                // Llenar los campos del formulario en el modal con los datos del producto
                document.getElementById("editID").value = data.respuesta[0][0][0].ID;
                document.getElementById("editNombre").value = data.respuesta[0][0][0].NOMBRE;
                document.getElementById("editDescripcion").value = data.respuesta[0][0][0].DESCRIPCION;
                document.getElementById("editPrecio").value = data.respuesta[0][0][0].PRECIO;
                document.getElementById("editcanti").value = data.respuesta[0][0][0].CANT_INICIAL;
                document.getElementById("editcomprados").value = data.respuesta[0][0][0].COMPRADOS;
                document.getElementById("editidproveedores").value = data.respuesta[0][0][0].ID_PROVEEDORES;
                console.log(data.respuesta[0][0][0])
                // Mostrar el modal
                modal.style.display = "block";
            }
        })
        .catch(error => console.log(error)); // Manejar errores de la solicitud fetch

    // Cerrar el modal al hacer clic en el botón de cierre
    span.onclick = () => {
        modal.style.display = "none";
    };

    // Cerrar el modal al hacer clic fuera del mismo
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};

// Actualizar producto
function actualizarProducto() {
  const id = document.getElementById("editID").value;
  const nombre = document.getElementById("editNombre").value;
  const descripcion = document.getElementById("editDescripcion").value;
  const precio = document.getElementById("editPrecio").value;
  const canti = document.getElementById("editcanti").value;
  const comprados = document.getElementById("editcomprados").value;
  const idproveedores = document.getElementById("editidproveedores").value;

  fetch(urlApi, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: id,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          cant_inicial: canti,
          comprados: comprados,
          id_proveedores: idproveedores,
      })
  })
  .then(data => {
    document.getElementById("editModal").style.display = "none";
    Swal.fire({
      icon: 'success',
      title: 'Producto actualizado con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      location.reload(); // Recargar la página después de cerrar el mensaje de éxito
    });
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al actualizar el producto');
  });
}

// BTON DE PRODUCT AGOTADO
document.getElementById('btn_agotados').onclick = function() {
  window.location.href = '/dash/agotados';  // Cambia 'otra_pagina.html' por la URL de la página a la que deseas redirigir
};

