import jsPDF from "jspdf";
import { info } from "../modals/infoCover";
const savePdfHandler = (container, store) => {
  if (container.children.length > 0) {
    let state = store.getState();

    //integra con el estado para solo unir las imagenes dibujadas ///

    let pages = container.children;
    let doc = new jsPDF("p", "pt", "letter", true, true);
    let pdfName = "sample.pdf";

    //preparacion pdf
    let tempCanvas = document.createElement("canvas");
    let tempContext = tempCanvas.getContext("2d");

    console.time("Generating pdf");
    for (let i = 0; i < pages.length; i++) {
      //page
      let imagePDF = pages[i].children[0];
      //draw
      let imageCanvas = pages[i].children[1];
      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      let isDrawn = false;

      tempCanvas.width = Math.floor(imagePDF.width / 1.1);
      tempCanvas.height = Math.floor(imagePDF.height / 1.1);

      state.forEach((page) => {
        if (page.idPage === imageCanvas.id) {
          isDrawn = true;
        }
      });

      if (isDrawn) {
        tempContext.drawImage(
          imagePDF,
          0,
          0,
          imagePDF.width,
          imagePDF.height,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
        );
        tempContext.drawImage(
          imageCanvas,
          0,
          0,
          imageCanvas.width,
          imageCanvas.height,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
        );

        doc.addImage(
          tempCanvas.toDataURL("image/jpeg", 0.3),
          "JPG",
          0,
          0,
          width,
          height,
          undefined,
          "SLOW"
        );
      } else {
        tempContext.drawImage(
          imagePDF,
          0,
          0,
          imagePDF.width,
          imagePDF.height,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height
        );
        doc.addImage(
          tempCanvas.toDataURL("image/jpeg", 0.3),
          "JPG",
          0,
          0,
          width,
          height,
          undefined,
          "SLOW"
        );
      }

      if (i + 1 !== pages.length) {
        doc.addPage();
      }
    }
    console.timeEnd("Generating pdf");

    // doc.save('d');
    doc.save("sample.pdf");

    //revisamos el estado para sacar la informacion y enviarla al servidor
    let pagesArray = [],
      messageArray = [];

    state.forEach((page) => {
      pagesArray.push(page.numPage);
      page.rectangles.forEach((rectangle) => {
        if (!messageArray.includes(rectangle.text.replace(/,/gi, "-"))) {
          messageArray.push(rectangle.text.replace(/,/gi, "-"));
        }
      });
    });
    info(pagesArray.join(", "), messageArray.join(", "));
  }
};

export default savePdfHandler;
