import renderPdf from "../renderPdf";
import closePdf from '../closePdf';
import { controlsPDFOpen, controlsPDFClose } from '../dom/interactionsUI';
let pdf;
const inputFile = (element, container) => {
  element.onchange = async (e) => {
    pdf = await renderPdf(element, container);
    controlsPDFOpen();
    
  }
}
const clear = (element, container) => {
  element.onclick = (e) => {
    closePdf(container);
    controlsPDFClose();
    pdf.cleanup();
    pdf.destroy().then()
  }
}

export {
  inputFile,
  clear,
};
