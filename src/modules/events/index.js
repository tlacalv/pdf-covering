import renderPdfHandler from "../handlers/renderPdfHandler.js";
import tempLayerHandler from '../handlers/tempLayerHandler';
import { close } from "../modals/close";

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
    close(container);
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
  setStore,
  inputFile,
  clear,
  tempLayerEvents
};
