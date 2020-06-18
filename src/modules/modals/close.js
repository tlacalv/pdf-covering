import Swal from 'sweetalert2';
import { controlsPDFClose } from '../dom/interactionsUI';
import closePdf from '../handlers/closePdf';
// let rect = new rectangle();
const close = (container) => {
  Swal.fire({
    title: 'Estas seguro?',
    text: "Cualquier cambio sin guardar se perdera",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
  }).then((result) => {
    if (result.value) {
      closePdf(container);
      controlsPDFClose();
      // pdf.cleanup();
      // pdf.destroy().then()
    }
  });
}

export {
  close
}