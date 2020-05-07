import pdfjsLib from 'pdfjs-dist/webpack';
const getPdf = async (PDFObjectURL) => {
  // let loadingTask = pdfjsLib.getDocument(PDFObjectURL);
  // let pdf = await loadingTask.promise;

  let pdf = await pdfjsLib.getDocument(PDFObjectURL).promise;
  
  
  return pdf;
}
export default getPdf;
