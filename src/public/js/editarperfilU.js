// URL
const url = sessionStorage.getItem("urlApi");
const CORREO = sessionStorage.getItem("email")
const token = sessionStorage.getItem("token");

// quemar datos
const cargarDatosUsuario = () => {
    const urlApi = url + "/api/user/" + `${CORREO}`; // Asegúrate de que la URL sea la correcta
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    };

    fetch(urlApi, options)
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log(data.body[0][0][0]);
                document.getElementById('name').value = data.body[0][0][0].NOMBRE;
                document.getElementById('lastname').value = data.body[0][0][0].APELLIDO;
                document.getElementById('email').value = data.body[0][0][0].CORREO;
                document.getElementById('doc').value = data.body[0][0][0].DOCUMENTO;
                // document.getElementById('password').value = data.body[0][0][0].CLAVE;
                document.getElementById('cel').value = data.body[0][0][0].CELULAR;
                document.getElementById('nomUser').innerText = data.body[0][0][0].NOMBRE;
                document.getElementById('nom-user').innerText = data.body[0][0][0].NOMBRE;
                
            } else {
                Swal.fire("Error al cargar los datos del usuario");
            }
        })
        .catch(err => {
            console.log("Tenemos un problema", err);
        });
}

// Llamar a la función para cargar los datos del usuario al cargar la página
document.addEventListener('DOMContentLoaded', cargarDatosUsuario);

//  "Authorization": `Bearer ${token}`
// modificar
const modificar = () => {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const doc = document.getElementById('doc').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const cel = document.getElementById('cel').value.trim();

    console.log("Values collected:", { name, lastname, email, doc, password, cel });

    // Verificar que los campos no estén vacíos
    if (!name || !lastname || !email || !doc  || !password || !cel) {
        Swal.fire("Hay campos vacíos!");
        console.log("Empty fields detected");
        return;
    }

    if (password !== password2) {
        Swal.fire("Las contraseñas no coinciden!");
        console.log("Passwords do not match");
        return;
    }

    console.log("All fields are filled. Proceeding with fetch call...");

    fetch(url + "/api/user", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({
            nombre: name,
            apellido: lastname,
            correo: email,
            documento: doc,
            clave: password,
            celular: cel,
        })
    })
    .then(response => {
        console.log("Fetch response:", response);
        return response.json(); // Convert the response to JSON
    })
    .then(data => {
        console.log("Response data:", data);
        Swal.fire({
            icon: 'success',
            title: 'Tu perfil fue actualizado con éxito',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // Limpiar la sessionStorage y redirigir al usuario a la página de inicio de sesión
            sessionStorage.clear();
            window.location.href = '/login'; // Cambia '/login' por la URL de tu página de inicio de sesión
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el perfil',
            text: error.message,
        });
    });
};

    

// npmbre de usuario
// const nomUser = jwtDecode(token)


// var elementos = document.querySelectorAll("#nomUser");

//   // Recorrer cada elemento y asignar el valor de la variable
//   elementos.forEach(function(elemento) {
//     elemento.innerHTML = nomUser.CORREO;
//   });


