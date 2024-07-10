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

// GENERAR REPORTE PDF
document.getElementById('reporte-productos').addEventListener('click', () => {
    fetch(urlApi)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error("error al generar reporte", data);
            } else {
                generarPDF(data.respuesta);
            }
        })
        .catch(error => console.log(error));
});

const generarPDF = (data) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });

    doc.setFontSize(18);
    doc.text('Productos por Agotarse', 14, 22);
    doc.setFontSize(12);
    doc.text(`Fecha: ${formattedDate} Hora: ${formattedTime}`, 14, 30);

    const col = ["Nombre", "Descripción", "Stock"];
    const rows = [];

    for (let i = 0; i < data.length; i++) {
        const temp = [data[i].NOMBRE, data[i].DESCRIPCION, data[i].STOCK];
        rows.push(temp);
    }

    doc.autoTable({
        head: [col],
        body: rows,
        startY: 40,
        headStyles: { fillColor: [190, 153, 71] }  // Color #be9947
    });

    doc.save('reporte_productos.pdf');
};