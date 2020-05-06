import getPdf from './getPdf';
import getPages from './getPages';
import renderPage from './renderPage';

const renderPdf = async (input, container) => {
  let file = input.files[0];
  const objectURL = window.URL.createObjectURL(file);
  const pdf = await getPdf(objectURL);
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
  input.value=null;

}

export default renderPdf;
