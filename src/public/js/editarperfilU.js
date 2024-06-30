// URL
const url = "https://backend-pf-p13h.onrender.com"
const token = sessionStorage.getItem("token");


const modificar = () => {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const doc = document.getElementById('doc').value;
    const password = document.getElementById('password').value;
    const cel = document.getElementById('cel').value;

    // Verificar que los campos no estén vacíos
    if (!name || !lastname || !email || !doc || !password || !cel) {
        Swal.fire("Hay campos vacíos!");
        return;
    }

    sessionStorage.setItem("urlApi", url);
    const urlApi = sessionStorage.getItem("urlApi") + "/api/user";
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre: name,
            apellido: lastname,
            correo: email,
            documento: doc,
            clave: password,
            celular: cel
        })
    };

    fetch(urlApi, options)
        .then(res => res.json())
        .then(data => {
            console.log("Response from API:", data); // Añadir para depuración
            if (data.error == false) {
                Swal.fire({
                    icon: "success",
                    title: "Has modificado tu información",
                    showConfirmButton: false,
                    timer: 1500
                });
                // setTimeout(function () {
                //     window.location.href = '/login';
                // }, 2000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "El correo ya existe, intenta con otro",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(err => {
            console.log("Tenemos un problema", err);
        });
}

// npmbre de usuario
// const nomUser = jwtDecode(token)


// var elementos = document.querySelectorAll("#nomUser");

//   // Recorrer cada elemento y asignar el valor de la variable
//   elementos.forEach(function(elemento) {
//     elemento.innerHTML = nomUser.CORREO;
//   });
