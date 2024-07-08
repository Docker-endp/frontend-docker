// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/pagotados"
console.log(urlApi);

// MOSTRAR
fetch(urlApi)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.error("error al mostrar datos", data);
        } else {
            mostrar(data.respuesta);
        }
    })
    .catch(error => console.log(error));

const mostrar = (data) => {
    console.log(data[0][0]);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <li>
                    <div class="card">
                        <div class="cont-img">
                            <img src="${data[i].IMAGEN}" alt="Producto">
                        </div>
                        <div class="card-body">
                            <p class="card-text"><b>Id: </b>${data[i].ID}</p>
                            <h5 class="card-title">${data[i].NOMBRE}</h5>
                            <p class="card-text"><b>Descripción: </b>${data[i].DESCRIPCION}</p>
                            <p class="card-text"><b>Stock: </b>${data[i].STOCK}</p>
                        </div>
                    </div>
                </li>                     
    `;
    }

    document.getElementById("data").innerHTML = body;
};