import pdfjsLib from 'pdfjs-dist/webpack';
const getPdf = async (PDFObjectURL) => {
  let loadingTask = pdfjsLib.getDocument(PDFObjectURL);
  const pdf = await loadingTask.promise;
  
  
  return pdf;
}
export default getPdf;
