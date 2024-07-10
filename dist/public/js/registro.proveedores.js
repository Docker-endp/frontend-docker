// URL base de la API
const url = sessionStorage.getItem("urlApi");

/**
 * Función para registrar un producto.
 * Se ejecuta cuando el usuario hace clic en el botón "Registrar Producto".
 */
const regproveedor = () => {
    console.log("Iniciando registro de proveedores...");

    // Obtener valores de los campos del formulario
    const empresa = document.getElementById('empresa').value;
    const tel = document.getElementById('telefono').value; // Obtener el archivo de imagen
    const sitio = document.getElementById('sitio_web').value;
    console.log("Valores obtenidos:", { empresa, tel, sitio});

    // Verificar que los campos no estén vacíos
    if (!empresa || !tel || !sitio) {
        Swal.fire("Hay campos vacíos!");
        console.log("Campos vacíos detectados.");
        return;
    }

     // Validar longitud del número de teléfono
     if (tel.length !== 7 && tel.length !== 10) {
        Swal.fire({
            icon: "error",
            title: "Número de teléfono inválido.",
            showConfirmButton: false,
            timer: 2000
        });
        return;
    }


    // URL de la API para registrar el producto
    const urlApi = url + "/api/prov"

    console.log("Enviando datos a:", urlApi);

    // Realizar la solicitud POST a la API
    fetch(urlApi, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            empresa: empresa,
            telefono: tel,
            sitio_web: sitio
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Respuesta de la API:", data);

            if (data.error == false) {
                // Alerta de producto registrado exitosamente
                Swal.fire({
                    icon: "success",
                    title: "El Proveedor ha sido registrado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Resetear el formulario
                document.getElementById('provForm').reset();
            } else {
                // Alerta de error al registrar el producto
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar el producto. Intenta nuevamente.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(err => {
            console.error("Tenemos un problema", err);
            // Alerta de error de conexión o problema en el servidor
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error. Intenta nuevamente.",
                showConfirmButton: false,
                timer: 1500
            });
        });
}