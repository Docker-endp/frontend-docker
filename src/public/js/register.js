// URL
const url = document.getElementById('url').value;
sessionStorage.setItem("urlApi", url)
const url2 = sessionStorage.getItem("urlApi");
console.log(url2)

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

    const urlApi = url2 + "/api/user";
    
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