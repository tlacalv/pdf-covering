import Swal from 'sweetalert2';
import cleanStateHandler from '../handlers/cleanStateHandler';
// let rect = new rectangle();
const cleanStateModal = (store) => {
  Swal.fire({
    title: 'Borrar elementos',
    text: "Se borraran todos los elementos dibujados hasta el momento!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
  }).then((result) => {
    if (result.value) {
      cleanStateHandler(store);
    }
  });
}

export {
  cleanStateModal
}