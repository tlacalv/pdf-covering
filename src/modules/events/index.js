import renderPdf from "../renderPdf";

const inputFile = (element, container) => {
  element.onchange = async (e) =>await renderPdf(element, container)
}

export {
  inputFile,
};
