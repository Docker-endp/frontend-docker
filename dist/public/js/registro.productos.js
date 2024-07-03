// URL base de la API
const url = sessionStorage.getItem("urlApi");

/**
 * Función para registrar un producto.
 * Se ejecuta cuando el usuario hace clic en el botón "Registrar Producto".
 */
const registerP = () => {
    console.log("Iniciando registro de producto...");

    // Obtener valores de los campos del formulario
    const name = document.getElementById('name').value;
    const img = document.getElementById('img').files[0]; // Obtener el archivo de imagen
    const description = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const canti = document.getElementById('cant_inicial').value;
    const comprados = document.getElementById('comprados').value;
    const id_proveedores = document.getElementById('id_proveedores').value;

    console.log("Valores obtenidos:", { name, img, description, precio, canti, comprados, id_proveedores });

    // Verificar que los campos no estén vacíos
    if (!name || !img || !description || !precio || !canti || !comprados || !id_proveedores) {
        Swal.fire("Hay campos vacíos!");
        console.log("Campos vacíos detectados.");
        return;
    }


    // URL de la API para registrar el producto
    const urlApi = url + "/api/product"

    console.log("Enviando datos a:", urlApi);

    // Realizar la solicitud POST a la API
    fetch(urlApi, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            imagen: img,
            descripcion: description,
            precio: precio,
            cant_inicial: canti,
            comprados: comprados,
            id_proveedores: id_proveedores
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log("Respuesta de la API:", data);
            if (data.error == false) {
                // Alerta de producto registrado exitosamente
                Swal.fire({
                    icon: "success",
                    title: "El producto ha sido registrado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                // Resetear el formulario
                document.getElementById('productForm').reset();
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