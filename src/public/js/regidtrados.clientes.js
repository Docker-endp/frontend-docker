  // Espera a que se cargue completamente la ventana antes de ejecutar el código
  window.onload = function() {
    obtenerNombreUsuario(); // Llama a la función para obtener el nombre del usuario
}

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
                <button class="button-reporte" onclick="generarReporteIndividual(${data[i].ID}, '${data[i].NOMBRE}', '${data[i].CORREO}', '${data[i].CELULAR}')">REPORTE</button>
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
      fetch(urlApi)
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


// Función para generar el PDF de una fila individual
function generarReporteIndividual(id, nombre, correo, celular) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.autoTable({
      head: [['ID', 'NOMBRE DEL CLIENTE', 'CORREO', 'CELULAR']],
      body: [[id, nombre, correo, celular]],
      headStyles: {
          fillColor: [190, 153, 71] // Color de fondo del encabezado en formato RGB
      },
  });

  doc.save(`cliente_ID:_${id}.pdf`);
}


// Función para generar el PDF
function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.autoTable({ 
      head: [['ID', 'NOMBRE DEL CLIENTE', 'CORREO', 'CELULAR']],
      body: Array.from(document.querySelectorAll("#data tr")).map(tr => 
          Array.from(tr.querySelectorAll("td")).map(td => td.innerText)
      ),
      headStyles: {
            fillColor: [190, 153, 71] // Color de fondo del encabezado en formato RGB
        },
  });

  doc.save('clientes.pdf');
}


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