import getPdf from './getPdf';
import getPages from './getPages';
import renderPage from './renderPage';
import { drawLayerEvents } from './events';

const renderPdf = async (input, container) => {
  let file = input.files[0];
  let objectURL = window.URL.createObjectURL(file);

  const pdf = await getPdf(objectURL);
  objectURL = null;
  let numPages = pdf.numPages;
  let pages = await getPages(pdf)
  let page = null;

  for(let i = 0; i <numPages; i++){
    page = pages[i]
    //creamos elementos
    let element = document.createElement('canvas'), drawLayer = document.createElement('canvas'), pageCont = document.createElement('div');
    element.id=`pageRender-${i+1}`;
    await renderPage(page, element)

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
  pages= null;
  page= null;
  input.value='';
  return pdf;
  
}

export default renderPdf;
