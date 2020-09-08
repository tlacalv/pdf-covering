import renderPdfHandler from "../handlers/renderPdfHandler.js";
import tempLayerHandler from '../handlers/tempLayerHandler';
import savePdfHandler from '../handlers/savePdfHandler';
import { menuBar } from '../dom/elements.js';
import { close } from "../modals/close";
import { cleanStateModal } from '../modals/cleanStateModal';

let store;
const setStore = (passedStore) => {
  store = passedStore;
}

const inputFile = (element, container) => {
  element.onchange = async (e) => {
    renderPdfHandler(e, container);
    let message = document.createElement('p');
    message.classList='message';
    message.innerText='Arrastra el mouse en la pagina para cubrir informacion - \nDrag anywhere on the page to cover information';
    menuBar.appendChild(message);
  }
}
const clear = (element, container) => {
  element.onclick = (e) => {
    close(container, store);
  }
}
const cleanState = (element) => {
  element.onclick = (e) => {
    //handler
    cleanStateModal(store);
  }
}

const tempLayerEvents = (canvas) => {
  canvas.onmousedown = (e) => {
    tempLayerHandler(e, store);
  }
  canvas.onmouseup = (e) => {
    tempLayerHandler(e, store);
  }
  canvas.onmousemove = (e) => {
    tempLayerHandler(e, store);
  }
  canvas.onmouseout = (e) => {
    tempLayerHandler(e, store);
  }

}
const savePdf =  (button, container) => {
  button.onclick =  (e) => {
    savePdfHandler(container, store)
  }
}

export {
  savePdf,
  cleanState,
  setStore,
  inputFile,
  clear,
  tempLayerEvents
};
