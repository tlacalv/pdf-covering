import renderPdfHandler from "../handlers/renderPdfHandler.js";
import closePdf from '../closePdf';
import { controlsPDFOpen, controlsPDFClose } from '../dom/interactionsUI';
import Swal from 'sweetalert2';
import ev_canvas from '../draw';

const inputFile = (element, container) => {
  element.onchange = async (e) => {
    renderPdfHandler(e, container);
  }
}
const clear = (element, container) => {
  element.onclick = (e) => {
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
    })
  }
}

const drawLayerEvents = (canvas) => {
  canvas.addEventListener('mousedown', ev_canvas, false)
  canvas.addEventListener('mousemove', ev_canvas, false)
  canvas.addEventListener('mouseup', ev_canvas, false)
  canvas.addEventListener('mouseout', ev_canvas, false)

}

export {
  inputFile,
  clear,
  drawLayerEvents
};
