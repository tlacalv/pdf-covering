import renderPdfHandler from "../handlers/renderPdfHandler.js";
import tempLayerHandler from '../handlers/tempLayerHandler';
import { close } from "../modals/close";
import { cleanStateModal } from '../modals/cleanStateModal';

let store;
const setStore = (passedStore) => {
  store = passedStore;
}

const inputFile = (element, container) => {
  element.onchange = async (e) => {
    renderPdfHandler(e, container);
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

export {
  cleanState,
  setStore,
  inputFile,
  clear,
  tempLayerEvents
};
