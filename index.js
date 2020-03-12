const superagent = require('superagent');
const superagentOrganismos = require('superagent');
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

  // limit nos va a dar la cantidad solicitada de respuestas.
  
  .query({ format: 'json', limit: 15 })
  .end(escribirArchivo)

superagentOrganismos
  .get('https://www.cultura.gob.ar/api/v2.0/organismos')
  .query({ format: 'json', limit: 15 })
  .end(escribirArchivoOrganismos)

function escribirArchivoOrganismos(error, respuesta) {
   const organismos = respuesta.body.results;
  
    if (fs.existsSync("organismos.txt")){
      fs.unlinkSync("organismos.txt");
      console.log("Se eliminó el archivo TXT preexistente")
    }
    
    var i = 0;
  
    for (i in organismos) {
  
      //Agregamos las lineas al archivo cargando Nombre, Dirección y Teléfono
  
      fs.appendFile('organismos.txt',"Organismo: " + organismos[i].nombre + 
      "Dirección: (" + organismos[i].direccion +
       ") Por cualquier consulta comunicarse al " + organismos[i].telefono +
       "\n", terminar);
  
    }
  
    
  }
  

function escribirArchivo(error, respuesta) {
  const museos = respuesta.body.results;

  if (fs.existsSync("museos.txt")){
    fs.unlinkSync("museos.txt");
    console.log("Se eliminó el archivo TXT preexistente")
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


