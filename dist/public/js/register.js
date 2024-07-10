// URL
const url = document.getElementById('url').value;
sessionStorage.setItem("urlApi", url)
const url2 = sessionStorage.getItem("urlApi");
console.log("url2 "+ url2)

// datos
const register = () => {
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const doc = document.getElementById('doc').value;
    const password = document.getElementById('password').value;
    const date = document.getElementById('date').value;
    const cel = document.getElementById('cel').value;


    // Verificar que lo campos no esten vacios
    if (!name || !lastname || !email || !doc || !password || !date || !cel) {
        Swal.fire("Hay campos vacios!");
        return;
    };

    // Validar que nombre y apellido solo contengan letras y no caracteres especiales
    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(name)) {
        Swal.fire("El nombre solo puede contener letras y no caracteres especiales!");
        return;
    }
    if (!namePattern.test(lastname)) {
        Swal.fire("El apellido solo puede contener letras y no caracteres especiales!");
        return;
    }

    // Validar que el correo contenga '@'
    if (!email.includes('@')) {
        Swal.fire("El correo NO cumple con los requisitos para ser valido!!");
        return;
    }

    // Validar que el documento solo contenga exactamente 8 o 10 números
    const docPattern = /^(?:\d{8}|\d{10})$/;
    if (!docPattern.test(doc)) {
        Swal.fire("El número de documento NO cumple con los requisitos para ser valido!!");
        return;
    }


   // Validar que el celular solo contenga exactamente 10 números
   const celPattern = /^\d{10}$/;
   if (!celPattern.test(cel)) {
       Swal.fire("El número de documento NO cumple con los requisitos para ser valido!!");
       return;
   }

    const urlApi = url2 + "/api/user";
    console.log(urlApi);
    
    const options = {
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

    fetch(urlApi, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
        })
        .catch(err => {
            console.log("Tenemos un problema", err);

        });


}