import pdfjsLib from 'pdfjs-dist/webpack';

class  Pdf {
  async initializePdf (objectURL) {
    this.pdfSource=objectURL;
    this.pdfFile = await this.getPdf();
    this.numPages = this.pdfFile.numPages;
  }

  async getPdf() {
    return await pdfjsLib.getDocument(this.pdfSource);
  }
  async getPages() {
    if(!this.pdfFile){
      return new Error('Pdf file not defined correctly');
    }
    let pagesPromises = [];
    for(let i=1; i<=this.numPages; i++) {
      pagesPromises.push(this.pdfFile.getPage(i));
    }
    return Promise.all(pagesPromises);
  }
  async renderPage(page, canvas) {
    let width = 1000;
    let scale;
    let viewport = page.getViewport({ scale: 1 })
    scale = width / viewport.width;

    let scaledViewpoer = page.getViewport({ scale })

    
    let context = canvas.getContext('2d');
    canvas.height = scaledViewpoer.height
    canvas.width = scaledViewpoer.width

    let renderContext = {
      canvasContext : context,
        viewport: scaledViewpoer
    };

    await page.render(renderContext)
    page.cleanup()
  }
}

export default Pdf;
