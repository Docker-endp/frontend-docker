"use strict";

// URL
var url = "http://localhost:3000";

// datos
var register = function register() {
  var name = document.getElementById('name').value;
  var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('email').value;
  var doc = document.getElementById('doc').value;
  var password = document.getElementById('password').value;
  var date = document.getElementById('date').value;
  var cel = document.getElementById('cel').value;

  // Verificar que lo campos no esten vacios
  if (!name || !lastname || !email || !doc || !password || !date || !cel) {
    Swal.fire("Hay campos vacios!");
    return;
  }
  ;
  sessionStorage.setItem("urlApi", url);
  var urlApi = sessionStorage.getItem("urlApi") + "/api/user";
  var options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: name,
      apellido: lastname,
      correo: email,
      documento: doc,
      clave: password,
      fecha_nacimiento: date,
      celular: cel
    })
  };
  fetch(urlApi, options).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.error == false) {
      // alerta usuario registrado
      Swal.fire({
        icon: "success",
        title: "Haz sido registrado Exitosamente",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(function () {
        window.location.href = '/login';
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "El correo ya existe, Intenta con otro",
        showConfirmButton: false,
        timer: 1500
      });
    }
  })["catch"](function (err) {
    console.log("Tenemos un problema", err);
  });
};