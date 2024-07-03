// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/pagotados"

// MOSTRAR
fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar datos", data);
        } else {
            mostrar(data.respuesta[0][0]);
        }
    })
    .catch(error => console.log(error));

const mostrar = (data) => {
    console.log(data[0]);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <li>
                    <div class="card">
                        <div class="cont-img">
                            <img src="../img/licorF1N1.png" alt="Producto">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${data[i].NOMBRE}</h5>
                            <p class="card-text">${data[i].ID}</p>
                            <p class="card-text"><b>Stock: </b>${data[i].STOCK}</p>
                        </div>
                    </div>
                </li>                     
    `;
    }

    document.getElementById("data").innerHTML = body;
};