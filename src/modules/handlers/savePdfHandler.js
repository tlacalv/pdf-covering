import jsPDF from "jspdf";
import { inputIdOficio, inputDBTable } from "../dom/elements";
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

    console.time("loop");
    for (let i = 0; i < pages.length; i++) {
      //page
      let imagePDF = pages[i].children[0];
      //draw
      let imageCanvas = pages[i].children[1];
      let width = doc.internal.pageSize.getWidth();
      let height = doc.internal.pageSize.getHeight();
      let isDrawn = false;

      tempCanvas.width = Math.floor(imagePDF.width / 1.3);
      tempCanvas.height = Math.floor(imagePDF.height / 1.3);

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
    console.timeEnd("loop");

    //API CALL
    // doc.save('d');
    let blob = doc.output("blob");

    let size = (bytes) => {
      return bytes / 1024 / 1024;
    };
    console.log("MB", size(blob.size));
    let formData = new FormData();
    formData.append("pdf", blob);

    //revisamos el estado para sacar la informacion y enviarla al servidor
    let pagesArray = [],
      messageArray = [];

    state.forEach((page) => {
      pagesArray.push(parseInt(page.numPage));
      page.rectangles.forEach((rectangle) => {
        if (!messageArray.includes(rectangle.text.replace(/,/gi, "-"))) {
          messageArray.push(rectangle.text.replace(/,/gi, "-"));
        }
      });
    });

    //loop
    let start = 0;
    let string = [];
    for (let i = 0; i < pagesArray.length; i++) {
      if (i === 0) {
        start = pagesArray[0];
        if (pagesArray.length === i + 1) string.push(start.toString());
      } else {
        if (pagesArray[i] === pagesArray[i - 1] + 1) {
          if (pagesArray.length === i + 1) {
            //tambien checar si es igual el start y el anterior
            string.push(`${start}-${pagesArray[i]}`);
          }
        } else {
          if (start === pagesArray[i - 1]) {
            string.push(start.toString());
            start = pagesArray[i];
          } else {
            string.push(`${start}-${pagesArray[i - 1]}`);
            start = pagesArray[i];
          }
          if (i === pagesArray.length - 1) {
            string.push(pagesArray[i].toString());
          }
        }
      }
    }
    //loop
    formData.append("pages", string);
    formData.append("messages", messageArray);
    formData.append("id_oficio", inputIdOficio.value);
    formData.append("db_table", inputDBTable.value);
    fetch("http://10.13.1.3/SIGTRANS/ajax/pdfupload.ajax.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("primera respuesta");
        return response.text();
      })
      .then((data) => {
        try {
          let json = JSON.parse(data);
          window.close();
          console.log(json.url);
          window.location.replace(json.url);
        } catch (e) {
          console.log(data);
        }
      })
      .catch((er) => console.log(er));
  }
};

export default savePdfHandler;
