import getPdf from './getPdf';
import getPages from './getPages';
import renderPage from './renderPage';

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
    let element = document.createElement('canvas');
    element.id=`page-${i+1}`;
    renderPage(page, element)
    container.appendChild(element);

  }
  pages= null;
  page= null;
  input.value='';
  return pdf;
  
}

export default renderPdf;
