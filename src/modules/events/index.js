import renderPdf from "../renderPdf";
import { controlsPDFOpen, controlsPDFClose } from '../dom/interactionsUI';

const inputFile = (element, container) => {
  element.onchange = async (e) => {
    await renderPdf(element, container);
    controlsPDFOpen();
  }
}
const clear = (element) => {
  element.onclick = () => {
    controlsPDFClose();
  }
}

export {
  inputFile,
  clear,
};
