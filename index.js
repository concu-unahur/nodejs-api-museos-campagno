const superagent = require('superagent');
const fs = require('fs');


function imprimirMuseos(error, respuesta) {
  if (error) {
    throw new Error('algo se rompió', error);
  }

  const cantidad = respuesta.body.count;
  const museos = respuesta.body.results;

  console.log(`Se encontraron ${cantidad} museos.`);
  console.log(`El primer museo se llama ${museos[0].nombre}.`)
}
function terminar() {
  console.log('Terminé de Leer')
} 

console.log('Antes de llamar a superagent')

function respuesta(error) {
  if(error) {
    throw new Error('no se pudo escribir');
  }
  console.log('Leer archivo')
  
}


superagent
  .get('https://www.cultura.gob.ar/api/v2.0/museos')
  .query({ format: 'json' })
  .end(escribirArchivo)

function escribirArchivo(error, respuesta) {
  const museos = respuesta.body.results;

  try {
    if (fs.existsSync("museos.txt")){
      fs.unlinkSync("museos.txt");
      console.log("Se eliminó el archivo TXT preexistente")
    }
  }
  catch(error) {
    console.log("No se encontró archivo Previo")
  }

  //console.log(museos.map(e => e.nombre))
  var i = 0;

  for (i in museos) {

    //Agregamos las lineas al archivo cargando Nombre, Dirección y Teléfono

    fs.appendFile('museos.txt',"Nombre:" + museos[i].nombre + 
    "Dirección: (" + museos[i].direccion +
     ") Teléfono: " + museos[i].telefono +
     "\n", terminar);

  }

  
}

console.log('Después de llamar a superagent')


