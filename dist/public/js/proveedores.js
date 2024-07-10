

// tabla
let url = sessionStorage.getItem("urlApi");
const urlApi = url + "/api/prov"

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
    console.log(data);

    let body = "";

    for (let i = 0; i < data.length; i++) {
        body += `
    
            <tr>
                <td>${data[i].ID}</td>
                <td>${data[i].EMPRESA}</td>
                <td>${data[i].TELEFONO}</td>
                <td>${data[i].SITIO_WEB}</td>
                <td>  
                <button class="button" onclick="eliminar(event);">
                ELIMINAR
                </button>
                </td>
            </tr>                        
    `;
    }

    document.getElementById("data").innerHTML = body;
};

// ELIMINAR
const eliminar = (event) => {
    const eliminar_id = event.target.parentElement.parentElement.children[0].innerText;
    console.log(eliminar_id);
  
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar este usuario?",
      text: "¡No podrás revertir la accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",

    }).then((result) => {
      if (result.isConfirmed) {
        eliminarApi(eliminar_id);
        Swal.fire({
          title: "¡Borrado!",
          text: "El usuario ha sido eliminado.",
          icon: "success",
        });
      }
    });
  };
  
  const eliminarApi = (ID) => {
    // const token = sessionStorage.getItem("token");
    // "x-access-token": token
  
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ID
      }),
    };
  
    fetch(urlApi, options)
      .then(res => res.json())
      .then(data => {
        if (data.error == false) {
          Swal.fire(data.respuesta);
          window.location.href = "/dash/lprov";
        }
      })
      .catch(err => {
        console.log("Tenemos un problema", err);
      });
  };




// Función para generar el PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener la fecha y hora actual del equipo
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();

    // Agregar encabezado y pie de página en cada página
    function addHeadersAndFooters() {
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(12);
            doc.text('LIQUOR-STORE', 105, 10, { align: 'center' });
            doc.text('LIQUOR-STORE', 105, 285, { align: 'center' });
        }
    }

    // Agregar el título al documento
    doc.setFontSize(18);
    doc.text('Nuestros Proveedores', 14, 22);

    // Agregar la fecha y hora al documento
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha} Hora: ${hora}`, 14, 32);

    // Generar la tabla con los datos
    doc.autoTable({ 
        startY: 40,
        head: [['ID', 'Nombre de la Empresa', 'Número de Contacto', 'Sitio Web']],
        body: Array.from(document.querySelectorAll("#data tr")).map(tr => 
            Array.from(tr.querySelectorAll("td")).map(td => td.innerText)
        ),
        headStyles: {
            fillColor: [190, 153, 71], // Color de fondo del encabezado en formato RGB
            textColor: [255, 255, 255], // Color del texto del encabezado
            fontSize: 12,
            fontStyle: 'bold',
        },
        bodyStyles: {
            fontSize: 10,
            fontStyle: 'normal',
        },
        alternateRowStyles: {
            fillColor: [221, 221, 221], // Color de fondo de filas alternas
        },
        didDrawPage: addHeadersAndFooters
    });

    doc.save('Proveedores.pdf');
}





      