import { selectButton, container, input, clearButton, clearStateButton, saveButton } from './elements.js';
import { inputFile, clear, cleanState, savePdf } from '../events/index';

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

  saveButton.classList.add('disabled')
  saveButton.disabled=true;
  saveButton.onclick=null;
}
const enableClear = () => {
  clearButton.classList.remove('disabled')
  clearButton.disabled=false;
  clearStateButton.classList.remove('disabled')
  clearStateButton.disabled=false;
  saveButton.classList.remove('disabled')
  saveButton.disabled=false;

  savePdf(saveButton, container);
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