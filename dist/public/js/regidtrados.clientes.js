
// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/user"

// MOSTRAR
fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar datos", data);
        } else {
            mostrar(data.respuesta[0]);
        }
    })
    .catch(error => console.log(error));

const mostrar = (data) => {
    console.log(data);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <tr>
                <td>${data[i].ID}</td>
                <td>${data[i].NOMBRE}</td>
                <td>${data[i].CORREO}</td>
                <td>${data[i].CELULAR}</td>
                <td>  
                <button class="button" onclick="eliminar(event);">
                ELIMINAR
                </button>
                </td>
            </tr>                        
    `;
    }

    document.getElementById("data").innerHTML = body;
};

// ELIMINAR
const eliminar = (event) => {
    const eliminar_id = event.target.parentElement.parentElement.children[0].innerText;
    console.log(eliminar_id);
  
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar este usuario?",
      text: "¡No podrás revertir la accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",

    }).then((result) => {
      if (result.isConfirmed) {
        eliminarApi(eliminar_id);
        Swal.fire({
          title: "¡Borrado!",
          text: "El usuario ha sido eliminado.",
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
        id: ID
      }),
    };
  
    fetch(urlApi, options)
      .then(res => res.json())
      .then(data => {
        if (data.error == false) {
          Swal.fire(data.respuesta);
          window.location.href = "/dash/clientes";
        }
      })
      .catch(err => {
        console.log("Tenemos un problema", err);
      });
  };

// BARRA BUSQUEDA
const buscarCliente = (query, data) => {
  // Filtra los datos de los clientes para encontrar coincidencias con el ID o Nombre
  let resultados = data.filter(cliente => 
      cliente.ID.toString().includes(query) || 
      cliente.NOMBRE.toLowerCase().includes(query.toLowerCase())
  );
  return resultados;
};

// Selecciona el campo de entrada de la barra de búsqueda
const inputBusqueda = document.getElementById('datos-busqueda');

// Añade un evento para escuchar cuando se presiona una tecla en la barra de búsqueda
inputBusqueda.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es 'Enter'
  if (event.key === 'Enter') {
      // Obtiene el valor de búsqueda
      let query = inputBusqueda.value;
      // Hace una solicitud a la API para obtener los datos de los clientes
      fetch(url)
          .then(res => res.json())
          .then(data => {
              if (data.error) {
                  console.error("Error al mostrar datos", data);
              } else {
                  // Busca clientes que coincidan con la consulta
                  let resultados = buscarCliente(query, data.respuesta[0]);
                  // Verifica si se encontraron resultados
                  if (resultados.length > 0) {
                      // Muestra los resultados en la tabla
                      mostrar(resultados);
                  } else {
                      // Muestra una alerta si no se encontraron resultados
                      Swal.fire({
                          title: "NO HAY RESULTADOS DE BUSQUEDA",
                          text: "El ID o Nombre que busca no se encuentra en la base de datos",
                          icon: "warning",
                      });
                  }
              }
          })
          .catch(error => console.log(error));
  }
});
