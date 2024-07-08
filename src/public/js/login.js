
// const url = "https://backend-pf-p13h.onrender.com"

// datos
const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const url = document.getElementById('url').value;

    // Verificar que lo campos no esten vacios
    if (!email || !password) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacios!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    // Validar que el correo contenga '@'
    if (!email.includes('@')) {
        Swal.fire("El correo NO cumple con los requisitos para ser valido!!");
        return;
    }

    sessionStorage.setItem("urlApi", url);
    sessionStorage.setItem("email", email);
    const urlApi = sessionStorage.getItem("urlApi") + "/api/login";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            correo: email,
            clave: password,
        })
    };
    
     fetch(urlApi, options)
        .then(res => res.json())
        .then(data => {
            if(data.error==true){
                
                Swal.fire({
                    icon: "error",
                    title: "Tienes un campo incorrecto",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                console.log(data);
                sessionStorage.setItem("token", data.body);
                setTimeout(function() {
                    
                    if(data.body[1] == "vendedorlicoreria@gmail.com"){
                        window.location.href = '/dash/perfilv';
                    } else {
                        window.location.href = '/dash/perfilu';
                    }
                    
                }, 1200);
            }
        })

        .catch(err => {
            console.log("Tenemos un problema", err);

        });
            
    
}

// BTN-REGRESAR
function backlogin() {
    window.location.href = '/';
}