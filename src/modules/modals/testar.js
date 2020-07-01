import Swal from 'sweetalert2';
import { drawRectangle, clearRectangle } from '../draw/rectangle';
import { addPage, addRectangle } from '../../actions';

// let rect = new rectangle();
//Options
let options = [
  'Domicilio particular que es diferente al lugar en dónde se realiza la actividad y/o para recibir notificaciones.',
  'Teléfono y correo electrónico de particulares.',
  'OCR de la Credencial de Elector.',
  'Código QR.',
  'Clave de elector de la credencial para votar, nombre, domicilio, teléfono y/o correo electrónico de terceros.',
  'Fotografía del promovente.'
]
const testar = (data, store) => {
  Swal.fire({
    title: 'Testar',
    text: "Ingresa el motivo de testado",
    icon: 'info',
    input: 'select',
    inputOptions: {
      ...options
    },  
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if(value.length > 0) {
          resolve();
        } else {
          resolve('Ingresa un motivo de testado');
        }
      })
    }
  }).then((result) => {
    if (result.value) {
      data = {text: options[result.value], ...data}
      
      //drawlayer
      let drawlayer = data.context.canvas.parentNode.childNodes[1];
      let drawlayerCtx = drawlayer.getContext('2d');
      drawRectangle(drawlayerCtx, data.startX, data.startY, data.width, data.height);
      clearRectangle(data.context, data.startX, data.startY, data.width, data.height);
      
      //get page and id
      let page = drawlayer.id;
      page = page.split('-');
      page = page[page.length-1];
      //add page to store
      let state = store.getState();
      //find
      if(!state.find(element => element.idPage === drawlayer.id)) {
        store.dispatch(addPage(drawlayer.id, page));
      }
      store.dispatch(addRectangle({ idPage: drawlayer.id, text: data.text, x: data.startX, y: data.startY, h: data.height, w: data.width }))
    }
    
    if(result.dismiss) {
      // console.log(rectk);
      
      clearRectangle(data.context, data.startX, data.startY, data.width, data.height)
    }
  })
}

export {
  testar
}