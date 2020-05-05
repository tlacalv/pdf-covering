import './assets/styles/main.scss';

import renderPdf from './modules/renderPdf';
// pdfjsLib.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.entry.js'
// require('../node_modules/pdfjs-dist/build/pdf.worker.js');

let input = document.getElementById('uploaded-file')
let container = document.getElementById('container');

//render PDF

renderPdf(input, container)

    