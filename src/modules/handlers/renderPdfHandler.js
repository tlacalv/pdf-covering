import Pdf from '../pdf.js';
import { drawLayerEvents } from '../events';
import { controlsPDFOpen } from '../dom/interactionsUI';

const renderPdfHandler = async (e, container) => {
  let objectURL = window.URL.createObjectURL(e.target.files[0]);
  let pdf = new Pdf();
  await pdf.initializePdf(objectURL);
  let pages = await pdf.getPages();
  let page;
  //rendering pdf
  for(let i = 0; i<pdf.numPages; i++) {
    page = pages[i]
    //creamos elementos
    let element = document.createElement('canvas'), drawLayer = document.createElement('canvas'), pageCont = document.createElement('div');
    element.id=`pageRender-${i+1}`;
    await pdf.renderPage(page, element)

    drawLayer.width=element.width;
    drawLayer.height=element.height;
    pageCont.appendChild(element);
    pageCont.appendChild(drawLayer);
    container.append(pageCont)

    element.style.position="relative"
    drawLayer.style.position="absolute"
    element.style.top="0"
    element.style.left="0"
    element.style.right="0"
    element.style.bottom="0"
    drawLayer.style.top="0"
    drawLayer.style.left="0"
    drawLayer.style.right="0"
    drawLayer.style.bottom="0"
    drawLayer.id=`drawLayer-${i+1}`

    drawLayerEvents(drawLayer);
    pageCont.classList=`page`
    pageCont.id=`page-${page.pageIndex+1}`;
  }
  controlsPDFOpen();
}

export default renderPdfHandler;
