import Swal from 'sweetalert2';
import { drawRectangle, clearRectangle } from '../draw/rectangle';
import { addPage } from '../../actions';

// let rect = new rectangle();
const testar = (data, store) => {
  Swal.fire({
    title: 'Testar',
    text: "Ingresa el motivo de testado",
    icon: 'info',
    input: 'text',
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
      data = {text: result.value, ...data}
      
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