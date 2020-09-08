import jsPDF from 'jspdf';
import { inputIdOficio } from '../dom/elements';
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
      //page
      let imagePDF = pages[i].children[0];
      //draw
      let imageCanvas = pages[i].children[1];
      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      let isDrawn = false;

      
      tempCanvas.width=Math.floor((imagePDF.width)/1.3);
      tempCanvas.height=Math.floor((imagePDF.height)/1.3);

      state.forEach((page) => {
        if (page.idPage === imageCanvas.id) {
          isDrawn = true;
        }
      })

      if(isDrawn) {
        tempContext.drawImage(imagePDF, 0, 0, imagePDF.width, imagePDF.height, 0, 0, tempCanvas.width, tempCanvas.height);
        tempContext.drawImage(imageCanvas,0, 0, imageCanvas.width, imageCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);
        
        doc.addImage(tempCanvas.toDataURL("image/jpeg",0.3),'JPG',0,0,width,height,undefined,'SLOW');
      }else {
        tempContext.drawImage(imagePDF, 0, 0, imagePDF.width, imagePDF.height, 0, 0, tempCanvas.width, tempCanvas.height);
        doc.addImage(tempCanvas.toDataURL("image/jpeg",0.3),'JPG',0,0,width,height,undefined,'SLOW');

      }

      if(i+1 !== pages.length) {
        doc.addPage();
      }
    }
    console.timeEnd("loop");
    
    //API CALL
    // doc.save('d');
    let blob = doc.output('blob');

    let size = (bytes) => {
      return bytes/1024/1024
    }
    console.log('MB', size(blob.size));
    let formData = new FormData();
    formData.append('pdf', blob);
    

    //revisamos el estado para sacar la informacion y enviarla al servidor
    let pagesArray = [], messageArray = []

    state.forEach(
      page => {
        pagesArray.push(page.numPage)
        page.rectangles.forEach(
          rectangle => {
            if(!messageArray.includes(rectangle.text.replace(/,/gi,'-'))) {
              messageArray.push(rectangle.text.replace(/,/gi,'-'))
            }
          }
        )
      }
    )
    formData.append('pages', pagesArray);
    formData.append('messages', messageArray);
    formData.append('id_oficio', inputIdOficio.value);
    fetch('http://localhost/SIGTRANS/ajax/pdfupload.ajax.php', {
      method: 'POST',
      body: formData
    })
    .then( response => response.json())
    .then(data => {
      window.close();
      console.log(data.url);
      window.location.replace(data.url);
      console.log('holo')
    })
    .catch(er => console.log(er));
    
      
    
    
  }
} 

export default savePdfHandler;
