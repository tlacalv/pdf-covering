import jsPDF from 'jspdf';

const savePdfHandler = (container, store) => {
  
  if (container.children.length > 0) {
    let state = store.getState();
  
    //integra con el estado para solo unir las imagenes dibujadas ///


    let pages = container.children;
    let doc = new jsPDF('p', 'pt', 'letter', true, true);
    let pdfName = 'sample.pdf';

    //preparacion pdf
    let tempCanvas = document.createElement('canvas');
    let tempContext = tempCanvas.getContext("2d");
    
    console.time("loop");
    for (let i = 0; i < pages.length; i++){
      let imagePDF = pages[i].children[0];
      let imageCanvas = pages[i].children[1];
      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      let isDrawn = false;

      tempCanvas.width=imagePDF.width;
      tempCanvas.height=imagePDF.height;

      state.forEach((page) => {
        if (page.idPage === imageCanvas.id) {
          isDrawn = true;
        }
      })

      if(isDrawn) {
        tempContext.drawImage(imagePDF, 0, 0);
        tempContext.drawImage(imageCanvas,0, 0);
        
        doc.addImage(tempCanvas,'JPG',0,0,width,height,undefined,'FAST');
      }else {
        doc.addImage(imagePDF,'JPG',0,0,width,height,undefined,'FAST');

      }

      if(i+1 !== pages.length) {
        doc.addPage();
      }
    }
    console.timeEnd("loop");
    
    //API CALL
      
    let blob = doc.output('blob');

    let formData = new FormData();
    formData.append('pdf', blob);
    

    //revisamos el estado para sacar la informacion y enviarla al servidor
    let pagesArray = [], messageArray = []

    state.forEach(
      page => {
        pagesArray.push(page.numPage)
        page.rectangles.forEach(
          rectangle => {
            if(!messageArray.includes(rectangle.text)) {
              messageArray.push(rectangle.text)
            }
          }
        )
      }
    )
    formData.append('pages', pagesArray);
    formData.append('messages', messageArray);

    fetch('http://localhost/SIGTRANS/ajax/pdfupload.ajax.php', {
      method: 'POST',
      body: formData
    })
    .then( response => response.text().then(text => console.log(text)))
    .then(data => console.log(data))
    .catch(er => console.log(er));
    
      
    
    
  }
} 

export default savePdfHandler;
