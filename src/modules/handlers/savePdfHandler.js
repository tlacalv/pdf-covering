import jsPDF from 'jspdf';

const savePdfHandler = async (container) => {

  if (container.children.length > 0) {
    let pages = container.children;
    let doc = new jsPDF('p', 'pt', 'letter');
    let pdfName = 'sample.pdf';

    //preparacion pdf
    let ratio = .8;
    let tempCanvas = document.createElement('canvas');
    let tempContext = tempCanvas.getContext("2d");
    let pixels, image1, imageDataPDF, image2, imageDataCanvas;
    

    for (let i = 0; i < pages.length; i++){
      
      
      let imagePDF = pages[i].children[0];
      let imageCanvas = pages[i].children[1];
      let width = Math.floor(imagePDF.width*ratio);
      let height = Math.floor(imagePDF.height*ratio);
      tempCanvas.width = width;
      tempCanvas.height = height;
      pixels = 4 * width * height;
      
      tempContext.drawImage(imagePDF, 0, 0,width,height);
      image1 = tempContext.getImageData(0, 0, width, height);
      imageDataPDF = image1.data;
      tempContext.drawImage(imageCanvas, 0, 0,width,height);
      image2 = tempContext.getImageData(0, 0, width, height);
      imageDataCanvas = image2.data;
      
      while (pixels--) {
        if(imageDataCanvas[pixels] === 0){
          imageDataPDF[pixels] = imageDataCanvas[pixels];
        }else {
          imageDataPDF[pixels] = imageDataPDF[pixels];

        }
      }
      let finalImage = new ImageData(imageDataPDF, width, height);
      // image1.data = imageDataPDF;
      tempContext.putImageData(finalImage, 0, 0);
      
      // // let imagePDF = $("div.pc"+pagina)[0].firstChild.src
      // // let imageCanvas = $("#imageView"+pagina)[0]

      // // const canvas = await html2canvas($("div.pc"+pagina)[0],{scale: 1.33})

      // // Export the canvas to its data URI representation
      // //var imgData = canvas.toDataURL("image/png");
      
      let imgData = tempCanvas.toDataURL("data:image/jpg;base64,verylongbase64");
      doc.addImage(imgData,'JPG',0,0,0,0,undefined,'FAST');
      doc.addPage();
      // if ($("div.pf").length==i+1) {
        
      //   //doc.save('sample-file.pdf');
        
      //   var blob = doc.output('blob');
      //   let arreglo = elements.map(item=>{
      //     return item.texto;
      //   });
      //   var formData = new FormData();
      //   formData.append('pdf', blob);
      //   formData.append('accion', 'guardar_vp');
      //   formData.append('elements', arreglo);
      //   console.log(formData);
      //   $.ajax('operacionesVP.php',
      //   {
      //       method: 'POST',
      //       data: formData,
      //       processData: false,
      //       contentType: false,
      //       success: function(data){console.log(data); $('#dialog').dialog("close");},
      //       error: function(data){ console.log(data)}
      //   }); 
      // } else {
      //   doc.addPage();
      // }        
      // i++;
      // fin htm2canvas
    }
    
    doc.save(pdfName);
    
  }
} 

export default savePdfHandler;
