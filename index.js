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
  fs.writeFile('museos.txt',museos[4].nombre, terminar);
}

console.log('Después de llamar a superagent')


