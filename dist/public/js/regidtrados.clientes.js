const btnTrash = document.querySelectorAll(".btn-trash");
const btnDelete = document.querySelector(".delete");
const noEliminar = document.getElementById("btn-not");
const btnCerrar = document.getElementById("btn-close");

// Añade un evento de clic a cada botón de 'Abrir Ventana'
btnTrash.forEach(function (button) {
    button.addEventListener("click", function () {
        btnDelete.style.display = 'block';
    });
});

btnCerrar.addEventListener("click", function () {
    btnDelete.style.display = 'none';
});

noEliminar.addEventListener("click", function () {
    btnDelete.style.display = 'none';
});

// tabla
let url = "http://localhost:3000/api/user";

// MOSTRAR
fetch(url)
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
                <td> <button class="btn-trash" onclick="eliminar(event);"> ELIMINAR </button> </td>
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
      title: "Estas seguro?",
      text: "¡No podrás revertirlo!",
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
  
    fetch(url, options)
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