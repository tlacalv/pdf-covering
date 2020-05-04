import './assets/styles/main.scss';
import pdfjsLib from 'pdfjs-dist/webpack';
// pdfjsLib.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.entry.js'
// require('../node_modules/pdfjs-dist/build/pdf.worker.js');
let container = document.getElementById('main');
    let loadingTask = pdfjsLib.getDocument('0476.pdf');
    loadingTask.promise
      .then((pdf)=>{
        let pages = [];
        console.log(pdf);
        console.log(pdf.numPages);
        for(let i=1; i<=pdf.numPages;i++){
          pages.push(pdf.getPage(i));
        }
        return pages;
        // return pdf.getPage(1)
      })
      .then(pages => {
        return Promise.all(pages);
      })
      .then(values=> {
        console.log(values)
      })
      // .then(page => {
      //   console.log(page)
      //   let width = 900;
      //   let scale = 1.3;
      //   let viewport = page.getViewport({ scale: 1 })
      //   scale = width / viewport.width;

      //   let scaledViewpoer = page.getViewport({ scale })

      //   let canvas = document.getElementById('the-canvas');
      //   let context = canvas.getContext('2d');
      //   canvas.height = scaledViewpoer.height
      //   canvas.width = scaledViewpoer.width

      //   let renderContext = {
      //     canvasContext : context,
      //       viewport: scaledViewpoer
      //   };

      //   page.render(renderContext);

      // })