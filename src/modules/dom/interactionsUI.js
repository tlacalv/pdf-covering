import { selectButton, container, input, clearButton, clearStateButton } from './elements.js';
import { inputFile, clear, cleanState } from '../events/index';

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
  
  clearStateButton.classList.add('disabled')
  clearStateButton.disabled=true;
  clearStateButton.onclick=null;
}
const enableClear = () => {
  clearButton.classList.remove('disabled')
  clearButton.disabled=false;
  clearStateButton.classList.remove('disabled')
  clearStateButton.disabled=false;

  cleanState(clearStateButton);
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