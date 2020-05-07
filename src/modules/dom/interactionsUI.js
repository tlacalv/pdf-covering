import { selectButton, container, input, clearButton } from './elements.js';
import { inputFile, clear } from '../events/index';

const disableSelect = () => {
  selectButton.classList.add('disabled')
  input.disabled=true;
}
const enableSelect = () => {
  selectButton.classList.remove('disabled')
  input.disabled=false;
}
const disableClear = () => {
  clearButton.classList.add('disabled')
  clearButton.disabled=true;
  clearButton.onclick=null;
}
const enableClear = () => {
  clearButton.classList.remove('disabled')
  clearButton.disabled=false;
  clear(clearButton, container);
}
const controlsPDFOpen = () => {
  disableSelect();
  enableClear();
}
const controlsPDFClose = () => {
  enableSelect();
  disableClear();
}


export {
  controlsPDFClose,
  controlsPDFOpen,
}