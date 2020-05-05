const getPages = async (pdf) => {
  let pagesPromises = [];
  for(let i=1; i<=pdf.numPages;i++){
    pagesPromises.push(pdf.getPage(i));
  }
  
  return Promise.all(pagesPromises);
  
}

export default getPages;
