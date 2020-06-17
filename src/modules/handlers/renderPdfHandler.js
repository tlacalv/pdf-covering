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
    let element = document.createElement('canvas'), tempDrawLayer = document.createElement('canvas'), pageCont = document.createElement('div');
    element.id=`pageRender-${i+1}`;
    await pdf.renderPage(page, element)

    tempDrawLayer.width=element.width;
    tempDrawLayer.height=element.height;
    pageCont.appendChild(element);
    pageCont.appendChild(tempDrawLayer);
    container.append(pageCont)

    element.style.position="relative"
    tempDrawLayer.style.position="absolute"
    element.style.top="0"
    element.style.left="0"
    element.style.right="0"
    element.style.bottom="0"
    tempDrawLayer.style.top="0"
    tempDrawLayer.style.left="0"
    tempDrawLayer.style.right="0"
    tempDrawLayer.style.bottom="0"
    tempDrawLayer.id=`tempDrawLayer-${i+1}`

    tempLayerEvents(tempDrawLayer);
    pageCont.classList=`page`
    pageCont.id=`page-${page.pageIndex+1}`;
  }
  controlsPDFOpen();
}

export default renderPdfHandler;
