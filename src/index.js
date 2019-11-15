import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
// Creas una funcion que se llama decargaUsuarios = (parametros)
const descargarUsuarios = cantidad =>
  new Promise((resolve, reject) => {
    //pasar la cantidad a la api
    const api = `https://randomuser.me/api/?results=${cantidad}&nat=us`;

    //llamado a ajax  //creando la conexión...
    const xhr = new XMLHttpRequest();

    //abrir la conexion  //le paso los datos...
    xhr.open("GET", api, true);

    //on load  //leo la respuesta
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText).results);
        0;
      } else {
        reject(Error(xhr.statusText));
      }
    };

    //optional (on error)
    xhr.onerror = error => reject(error);

    //send //se encarga de enviar el request...
    xhr.send();
  });

const descargaDatos = cantidad => {
  const api = `https://randomuser.me/api/?results=${cantidad}&nat=us`;

  fetch(api, { method: "GET" })
    .then(response => response.json())
    .then(json => imprimirHTML(json.results))
    .catch(error => console.error("error:", error));
};

descargaDatos(200);

/* descargarUsuarios(30).then(
  datosOk => console.log(datosOk),
  datosAlumnos => imprimirHTML(datosAlumnos),
  error => console.log(new Error("Error al hacer la peticion" + error))
); */
// console.log(descargarUsuarios(10))

let imprimirHTML = datosAlumnos => {
  let html = "";

  datosAlumnos.forEach(miembro => {
    html += `<br>
          <li>    Nombre: ${miembro.name.first} ${miembro.name.last}</li>
          <li>    País: ${miembro.nat} </li>  
          <li>   Imagen: 
                  <img src="${miembro.picture.medium}" /> </li>  
          </li>      
          <br>
          <br>
      `;
  });

  const contenedorApp = document.querySelector("#app");
  contenedorApp.innerHTML = html;
};
