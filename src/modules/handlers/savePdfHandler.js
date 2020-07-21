import jsPDF from 'jspdf';

const savePdfHandler = (container, store) => {
  
  if (container.children.length > 0) {
    let state = store.getState();
  
    //integra con el estado para solo unir las imagenes dibujadas ///


    let pages = container.children;
    let doc = new jsPDF('p', 'pt', 'letter');
    let pdfName = 'sample.pdf';

    //preparacion pdf
    let tempCanvas = document.createElement('canvas');
    let tempContext = tempCanvas.getContext("2d");
    // // if ($("div.pf").length==i+1) {
      
    // //   //doc.save('sample-file.pdf');
      
    // //   var blob = doc.output('blob');
    // //   let arreglo = elements.map(item=>{
    // //     return item.texto;
    // //   });
    // //   var formData = new FormData();
    // //   formData.append('pdf', blob);
    // //   formData.append('accion', 'guardar_vp');
    // //   formData.append('elements', arreglo);
    // //   console.log(formData);
    // //   $.ajax('operacionesVP.php',
    // //   {
    // //       method: 'POST',
    // //       data: formData,
    // //       processData: false,
    // //       contentType: false,
    // //       success: function(data){console.log(data); $('#dialog').dialog("close");},
    // //       error: function(data){ console.log(data)}
    // //   }); 
    // // } else {
    // //   doc.addPage();
    // // }        
    // // i++;
    
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
    doc.save(pdfName);
    
    
  }
} 

export default savePdfHandler;
