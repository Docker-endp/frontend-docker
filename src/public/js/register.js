// URL
const url = "http://localhost:3000"


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
    if (!name || !lastname || !email || !doc || !password || !date ||!cel) {
        Swal.fire("Hay campos vacios!");
        return;
    };

    sessionStorage.setItem("urlApi", url);
    const urlApi = sessionStorage.getItem("urlApi") + "/api/user";
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
        })
        .catch(err => {
            console.log("Tenemos un problema", err);

        });
            
    
}