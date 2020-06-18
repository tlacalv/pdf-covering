import renderPdfHandler from "../handlers/renderPdfHandler.js";
import tempLayerHandler from '../handlers/tempLayerHandler';
import { close } from "../modals/close";

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
    tempLayerHandler(e);
  }
  canvas.onmouseup = (e) => {
    tempLayerHandler(e);
  }
  canvas.onmousemove = (e) => {
    tempLayerHandler(e);
  }
  canvas.onmouseout = (e) => {
    tempLayerHandler(e);
  }

}

export {
  inputFile,
  clear,
  tempLayerEvents
};
