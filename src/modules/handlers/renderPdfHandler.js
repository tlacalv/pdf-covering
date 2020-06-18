import Pdf from '../pdf.js';
import { tempLayerEvents } from '../events';
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
    let element = document.createElement('canvas'), tempDrawLayer = document.createElement('canvas'), pageCont = document.createElement('div'), drawLayer = document.createElement('canvas');
    await pdf.renderPage(page, element)
    
    //canvas draw layers setup
    tempDrawLayer.width=element.width;
    tempDrawLayer.height=element.height;
    drawLayer.width=element.width;
    drawLayer.height=element.height;
    
    //attach to DOM
    pageCont.appendChild(element);
    pageCont.appendChild(drawLayer);
    pageCont.appendChild(tempDrawLayer);
    container.append(pageCont);
    
    //styles of canvas
    //PDF canvas render
    element.style.position="relative";
    element.style.top="0";
    element.style.left="0";
    element.style.right="0";
    element.style.bottom="0";
    element.id=`pageRender-${i+1}`;
    //Temporal draw layer
    tempDrawLayer.style.position="absolute";
    tempDrawLayer.style.top="0";
    tempDrawLayer.style.left="0";
    tempDrawLayer.style.right="0";
    tempDrawLayer.style.bottom="0";
    tempDrawLayer.id=`tempDrawLayer-${i+1}`;
    //Draw layer
    drawLayer.style.position="absolute";
    drawLayer.style.top="0";
    drawLayer.style.left="0";
    drawLayer.style.right="0";
    drawLayer.style.bottom="0";
    drawLayer.id=`drawLayer-${i+1}`;

    tempLayerEvents(tempDrawLayer);
    pageCont.classList=`page`
    pageCont.id=`page-${page.pageIndex+1}`;
  }
  controlsPDFOpen();
}

export default renderPdfHandler;
