import Swal from 'sweetalert2';
import { drawRectangle, clearRectangle } from '../draw/rectangle';

// let rect = new rectangle();
const testar = (data) => {
  Swal.fire({
    title: 'Testar',
    text: "Ingresa el motivo de testado",
    icon: 'info',
    input: 'text',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
  }).then((result) => {
    if (result.value) {
      data = {text: result.value, ...data}
      console.log(data)
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