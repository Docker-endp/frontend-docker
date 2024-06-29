"use strict";

var btnTrash = document.querySelectorAll(".btn-trash");
var btnDelete = document.querySelector(".delete");
var noEliminar = document.getElementById("btn-not");
var btnCerrar = document.getElementById("btn-close");

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
var url = "http://localhost:3000/api/user";

// MOSTRAR
fetch(url).then(function (res) {
  return res.json();
}).then(function (data) {
  if (data.error) {
    console.error("error al mostrar datos", data);
  } else {
    mostrar(data.respuesta[0]);
  }
})["catch"](function (error) {
  return console.log(error);
});
var mostrar = function mostrar(data) {
  console.log(data);
  var body = "";
  for (var i = 0; i < data.length; i++) {
    body += "\n    \n            <tr>\n                <td>".concat(data[i].ID, "</td>\n                <td>").concat(data[i].NOMBRE, "</td>\n                <td>").concat(data[i].CORREO, "</td>\n                <td>").concat(data[i].CELULAR, "</td>\n                <td> <button class=\"btn-trash\" onclick=\"eliminar(event);\"> ELIMINAR </button> </td>\n            </tr>                        \n    ");
  }
  document.getElementById("data").innerHTML = body;
};

// ELIMINAR
var eliminar = function eliminar(event) {
  var eliminar_id = event.target.parentElement.parentElement.children[0].innerText;
  console.log(eliminar_id);
  Swal.fire({
    title: "Estas seguro?",
    text: "¡No podrás revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  }).then(function (result) {
    if (result.isConfirmed) {
      eliminarApi(eliminar_id);
      Swal.fire({
        title: "¡Borrado!",
        text: "El usuario ha sido eliminado.",
        icon: "success"
      });
    }
  });
};
var eliminarApi = function eliminarApi(ID) {
  // const token = sessionStorage.getItem("token");
  // "x-access-token": token

  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: ID
    })
  };
  fetch(url, options).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error == false) {
      Swal.fire(data.respuesta);
      window.location.href = "/dash/clientes";
    }
  })["catch"](function (err) {
    console.log("Tenemos un problema", err);
  });
};